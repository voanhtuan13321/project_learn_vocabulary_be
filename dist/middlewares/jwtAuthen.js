"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwtService_1 = __importDefault(require("../services/jwtService"));
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.sendStatus(401);
        return;
    }
    const result = jwtService_1.default.verifyAccessToken(token);
    if (!result.success) {
        res.status(403).json({ error: result.error });
        return;
    }
    req.user = result.data;
    next();
};
exports.default = { authenticateToken };
//# sourceMappingURL=jwtAuthen.js.map