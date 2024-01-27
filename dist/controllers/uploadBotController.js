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
const uploadBotModel_1 = __importDefault(require("../models/uploadBotModel"));
const handleUploadBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { NameBot, ValueBot } = req.body;
        const dto = new uploadBotModel_1.default({
            NameBot: NameBot,
            ValueBot: JSON.parse(ValueBot)
        });
        yield dto
            .save()
            .then((data) => res.status(200).json({ status: "Upload Bot Success" }))
            .catch((error) => res.status(404).json({ status: "Upload Bot failed", error }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const getBotUploaded = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bot = yield uploadBotModel_1.default.find();
    return res.status(200).json(bot);
});
const handleDeleteBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    yield uploadBotModel_1.default.deleteOne(result)
        .then(value => {
        if (value.deletedCount === 1) {
            return res.status(200).json({ status: "Delete Bot Success" });
        }
        else {
            return res.status(500).json({ error: "No documents matched the query. Deleted 0 documents." });
        }
    });
});
exports.default = {
    handleUploadBot,
    getBotUploaded,
    handleDeleteBot
};
