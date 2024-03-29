"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const routerUsers = express_1.default.Router();
routerUsers.post("/login", userController_1.default.LoginUser);
routerUsers.post("/logout", 
// middlewareController.verifyAccessToken,
userController_1.default.LogoutUser);
routerUsers.post("/register", 
//   middlewareController.createAccountLimiter,
userController_1.default.RegisterUser);
exports.default = routerUsers;
