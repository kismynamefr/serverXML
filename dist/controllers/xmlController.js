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
const dotenv_1 = __importDefault(require("dotenv"));
const xmlModels_1 = __importDefault(require("../models/xmlModels"));
const moment_1 = __importDefault(require("moment"));
dotenv_1.default.config();
const handleActiveBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { formValue } = req.body;
        let value;
        if (!formValue.ExpiredDay.length)
            value = 'NERVER';
        else
            value = (0, moment_1.default)(`${formValue.ExpiredDay}`).unix();
        const dto = new xmlModels_1.default(Object.assign(Object.assign({}, formValue), { ExpiredDay: value }));
        yield dto
            .save()
            .then((data) => res.status(200).json({ status: "Activated Bot" }))
            .catch((error) => res.status(404).json({ status: "Saving bot activation data failed", error }));
    }
    catch (error) {
        return res.status(500).json(error);
    }
});
const getActivatedBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const activeBot = yield xmlModels_1.default.find();
    return res.status(200).json(activeBot);
});
const handleDeleteActivatedBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = req.body;
    yield xmlModels_1.default.deleteOne(result)
        .then(value => {
        if (value.deletedCount === 1) {
            return res.status(200).json({ status: "Successfully deleted the activated Bot" });
        }
        else {
            return res.status(500).json({ error: "No documents matched the query. Deleted 0 documents." });
        }
    });
});
const handleEditActivatedBot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { formValue } = req.body;
    let value;
    if (formValue.ExpiredDay === 'NERVER') {
        value = 'NERVER';
        yield xmlModels_1.default.findOneAndUpdate({ _id: formValue._id }, {
            BBotID: formValue.BBotID,
            ValueBot: formValue.ValueBot,
            Name: formValue.Name,
            ExpiredDay: value
        }).then((value) => {
            return res.status(200).json({ status: "Edit bot success" });
        }).catch((error) => {
            return res.status(500).json({ error: "Edit bot error" });
        });
    }
    else {
        value = (0, moment_1.default)(`${formValue.ExpiredDay}`).unix();
        yield xmlModels_1.default.findOneAndUpdate({ _id: formValue._id }, {
            BBotID: formValue.BBotID,
            ValueBot: formValue.ValueBot,
            Name: formValue.Name,
            ExpiredDay: value
        }).then((value) => {
            return res.status(200).json({ status: "Edit bot success" });
        }).catch((error) => {
            return res.status(500).json({ error: "Edit bot error" });
        });
    }
});
exports.default = {
    handleActiveBot,
    getActivatedBot,
    handleDeleteActivatedBot,
    handleEditActivatedBot
};
