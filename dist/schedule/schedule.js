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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_schedule_1 = __importDefault(require("node-schedule"));
const xmlModels_1 = __importDefault(require("../models/xmlModels"));
const reUpActiveFalse = (BBotID) => __awaiter(void 0, void 0, void 0, function* () {
    yield xmlModels_1.default.updateOne({ BBotID: BBotID }, { Active: false });
    console.log(`Update Active false for BBotID ${BBotID}`);
});
const checkBotActive = () => __awaiter(void 0, void 0, void 0, function* () {
    const fetchActiveBot = yield xmlModels_1.default.find({
        Active: true
    });
    const resultFinal = fetchActiveBot === null || fetchActiveBot === void 0 ? void 0 : fetchActiveBot.filter((res) => {
        let ExpiredDay = Number(res.ExpiredDay);
        let now = Math.floor(new Date().getTime() / 1000);
        if (Number(now) > ExpiredDay) {
            reUpActiveFalse(res.BBotID);
        }
        ;
    });
    return resultFinal;
});
node_schedule_1.default.scheduleJob("*/10 * * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
    checkBotActive();
}));
