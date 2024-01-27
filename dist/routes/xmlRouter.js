"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routerXML = express_1.default.Router();
const xmlController_1 = __importDefault(require("../controllers/xmlController"));
const uploadBotController_1 = __importDefault(require("../controllers/uploadBotController"));
routerXML.get('/getbot', uploadBotController_1.default.getBotUploaded);
routerXML.get('/getActivatedBot', xmlController_1.default.getActivatedBot);
routerXML.post('/activebot', xmlController_1.default.handleActiveBot);
routerXML.post('/uploadbot', uploadBotController_1.default.handleUploadBot);
routerXML.post('/deleteBot', uploadBotController_1.default.handleDeleteBot);
routerXML.post('/deleteActivatedBot', xmlController_1.default.handleDeleteActivatedBot);
routerXML.post('/editActivatedBot', xmlController_1.default.handleEditActivatedBot);
exports.default = routerXML;
