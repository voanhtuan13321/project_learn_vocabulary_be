"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const username = (_a = process.env.DB_USERNAME) !== null && _a !== void 0 ? _a : '';
const password = (_b = process.env.DB_PASSWORD) !== null && _b !== void 0 ? _b : '';
const dbName = (_c = process.env.DB_NAME) !== null && _c !== void 0 ? _c : '';
const connect = () => {
    const uri = `mongodb+srv://${username}:${password}@tuanva.g1oph44.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    mongoose_1.default
        .connect(uri)
        .then(() => console.log('DB is Connected!'))
        .catch(err => console.log('Error connecting', err));
};
exports.default = { connect };
//# sourceMappingURL=connectDB.js.map