"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config({ path: '/home/serverXML/.env' });
let RefreshTokenArr = [];
const RegisterUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashed = yield bcryptjs_1.default.hash(formData.password, salt);
        const dto = new userModel_1.default(Object.assign(Object.assign({}, formData), { password: hashed }));
        yield dto
            .save()
            .then((data) => res.status(200).json({ status: "Success" }))
            .catch((error) => res.status(404).json({ status: "Register failed", error }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const LoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const userData = yield userModel_1.default.findOne({
            username: formData.username,
        });
        if (!userData)
            return res.status(404).json({ status: "Wrong Username" });
        const result = yield bcryptjs_1.default.compare(formData.password, userData === null || userData === void 0 ? void 0 : userData.password);
        if (!result)
            return res.status(404).json({ status: "Wrong Password" });
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
            const _a = userData._doc, { password } = _a, otherPassword = __rest(_a, ["password"]);
            return res.status(200).json(Object.assign(Object.assign({}, otherPassword), { accessToken }));
        }
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const LogoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("refreshToken");
    RefreshTokenArr = RefreshTokenArr.filter((token) => token !== res.cookie["refreshToken"]);
    return res.status(200).json("Logged out!");
});
const generateJWTToken = (userData) => {
    const accessToken = jsonwebtoken_1.default.sign({ id: userData.id, admin: userData.admin }, String(process.env.JWT_ACCESS_KEY), {
        expiresIn: "6h",
    });
    return accessToken;
};
const generateRefreshJWTToken = (userData) => {
    const refreshToken = jsonwebtoken_1.default.sign({ id: userData.id, admin: userData.admin }, String(process.env.JWT_REFRESH_KEY), {
        expiresIn: "365d",
    });
    return refreshToken;
};
exports.default = {
    RegisterUser,
    LoginUser,
    LogoutUser,
};
