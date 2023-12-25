"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const vocabularySchema = new mongoose_1.default.Schema({
    userId: String,
    word: String,
    type: String,
    meaning: String,
    status: Boolean,
    numberOfCorrectTimes: Number,
    numberOfIncorrectTimes: Number,
}, { timestamps: true });
const Vocabulary = mongoose_1.default.model('Vocabulary', vocabularySchema);
exports.default = Vocabulary;
//# sourceMappingURL=vocabulary.js.map