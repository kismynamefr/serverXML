import express from "express";
import userController from "../controllers/userController";
import middlewareController from "../controllers/middlewareController";
const routerUsers = express.Router();

routerUsers.post("/login", userController.LoginUser);
routerUsers.post(
    "/logout",
    // middlewareController.verifyAccessToken,
    userController.LogoutUser
);
routerUsers.post(
    "/register",
    //   middlewareController.createAccountLimiter,
    userController.RegisterUser
);

export default routerUsers;