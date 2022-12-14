import { NextFunction, Request, Response } from "express";
import Users from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require('dotenv').config({path: '/home/serverXML/.env'});

let RefreshTokenArr: any[] = [];

const RegisterUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const formData = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(formData.password, salt);
        const dto = new Users({
            ...formData,
            password: hashed,
        });
        await dto
            .save()
            .then((data) => res.status(200).json({ status: "Success" }))
            .catch((error) =>
                res.status(404).json({ status: "Register failed", error })
            );
    } catch (error) {
        return res.status(500).json(error);
    }
};

const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const formData = req.body;
        const userData: any = await Users.findOne({
            username: formData.username,
        });
        if (!userData) return res.status(404).json({ status: "Wrong Username" });
        const result = await bcrypt.compare(formData.password, userData?.password);
        if (!result) return res.status(404).json({ status: "Wrong Password" });
        if (userData && result) {
            const accessToken = generateJWTToken(userData);
            const refreshToken = generateRefreshJWTToken(userData);
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
            RefreshTokenArr.push(refreshToken);
            const { password, ...otherPassword } = userData._doc;
            return res.status(200).json({ ...otherPassword, accessToken });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
};

const LogoutUser = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("refreshToken");
    RefreshTokenArr = RefreshTokenArr.filter(
        (token: any) => token !== res.cookie["refreshToken"]
    );
    return res.status(200).json("Logged out!");
};

const generateJWTToken = (userData: any) => {
    const accessToken = jwt.sign(
        { id: userData.id, admin: userData.admin },
        String(process.env.JWT_ACCESS_KEY),
        {
            expiresIn: "6h",
        }
    );
    return accessToken;
};

const generateRefreshJWTToken = (userData: any) => {
    const refreshToken = jwt.sign(
        { id: userData.id, admin: userData.admin },
        String(process.env.JWT_REFRESH_KEY),
        {
            expiresIn: "365d",
        }
    );
    return refreshToken;
};

export default {
    RegisterUser,
    LoginUser,
    LogoutUser,
};