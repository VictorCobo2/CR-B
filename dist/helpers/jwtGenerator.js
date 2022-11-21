"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJwt = (uid = "") => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jsonwebtoken_1.default.sign(payload, `${process.env.SECRETKEY}`, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se genero el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJwt = generarJwt;
