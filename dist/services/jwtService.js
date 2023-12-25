"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SECRET = process.env.JWT_SECRET_KEY || 'your-secret-key';
const generateAccessToken = (user) => {
    const payload = { id: user._id, username: user.username };
    const options = { expiresIn: '24h' };
    return jsonwebtoken_1.default.sign(payload, SECRET, options);
};
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        return { success: true, data: decoded };
    }
    catch (err) {
        return {
            success: false,
            error: err.message || 'Unknown error occurred',
        };
    }
};
exports.default = { generateAccessToken, verifyAccessToken };
//# sourceMappingURL=jwtService.js.map