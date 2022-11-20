"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router_record = void 0;
const express_1 = __importDefault(require("express"));
const record_1 = require("../controllers/record");
const validators_1 = require("../helpers/validators");
exports.router_record = express_1.default.Router();
exports.router_record.post("/record", validators_1.JwtValidator, record_1.addRecord);
exports.router_record.get("/record", validators_1.JwtValidator, record_1.getAllRecord);
exports.router_record.get("/record/:id", validators_1.JwtValidator, record_1.searchRecord);
exports.router_record.get("/record_history/:zone_id/:id_watchman/:since/:until", validators_1.JwtValidator, record_1.searchRecordWithUser);
