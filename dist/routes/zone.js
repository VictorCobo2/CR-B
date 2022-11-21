"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.route_zone = void 0;
const express_1 = __importDefault(require("express"));
const zone_1 = require("../controllers/zone");
const validators_1 = require("../helpers/validators");
exports.route_zone = express_1.default.Router();
exports.route_zone.post("/zone", validators_1.JwtValidator, zone_1.createZone);
exports.route_zone.get("/zone", validators_1.JwtValidator, zone_1.getAllZones);
exports.route_zone.get("/zone/:id", validators_1.JwtValidator, zone_1.searchZone);
exports.route_zone.delete("/zone/:id", validators_1.JwtValidator, zone_1.deleteZone);
exports.route_zone.get("/zone_names", validators_1.JwtValidator, zone_1.zoneNames);
//-------------Points--------------//
exports.route_zone.delete("/point/:id/:id_point", validators_1.JwtValidator, zone_1.deletePoint);
exports.route_zone.put("/point/:id", validators_1.JwtValidator, zone_1.addPoint);
//-------------Zone----------------//
exports.route_zone.put("/watchman/:id/:id_watchman", validators_1.JwtValidator, zone_1.addWatchman);
exports.route_zone.get("/record_zone/:id", validators_1.JwtValidator, zone_1.searchRecordZone);
//------------Location-------------// 
exports.route_zone.put("/location", validators_1.JwtValidator, zone_1.aggLocation);
