"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JwtValidator = (req, res, next) => {
    const token = req.header('x_token');
    if (!token) {
        return res.status(401).json({
            msg: "ERROR access denied",
        });
    }
    try {
        jsonwebtoken_1.default.verify(token, `${process.env.SECRETKEY}`);
        return next();
    }
    catch (error) {
        return res.status(401).json({
            msg: "Invalid token",
        });
    }
};
exports.JwtValidator = JwtValidator;
