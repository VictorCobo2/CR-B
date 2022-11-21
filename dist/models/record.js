"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.record_model = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const zone_1 = require("./zone");
const record_schema = new mongoose_1.Schema({
    point_name: {
        type: String,
        required: true,
    },
    zone_id: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "zone",
        required: true,
    },
    name_zone: {
        type: String,
        required: true,
    },
    id_watchman: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time_date: {
        type: String,
        required: true,
    },
    name_watchman: {
        type: String,
        required: true,
    },
    document_watchman: {
        type: String,
        required: true,
    },
    latitude: {
        type: Number,
    },
    longitude: {
        type: Number,
    },
});
function getDistanciaMetros(lat1, lon1, lat2, lon2) {
    const rad = function (x) {
        return (x * Math.PI) / 180;
    };
    const EARTH_RADIUS = 6378.137;
    let distance_latitude = rad(lat2 - lat1);
    let dist_longitude = rad(lon2 - lon1);
    let angles = Math.sin(distance_latitude / 2) * Math.sin(distance_latitude / 2) +
        Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dist_longitude / 2) * Math.sin(dist_longitude / 2);
    let round = 2 * Math.atan2(Math.sqrt(angles), Math.sqrt(1 - angles));
    let distance = EARTH_RADIUS * round * 1000;
    return distance;
}
record_schema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield zone_1.zone_model.findById({ _id: this.zone_id });
        const points = data === null || data === void 0 ? void 0 : data.point;
        const resultado = points === null || points === void 0 ? void 0 : points.find((poin) => poin.point_name === this.point_name);
        let countLocation = 0;
        let result = false;
        if ((resultado === null || resultado === void 0 ? void 0 : resultado.required_location) === true) {
            if ((resultado === null || resultado === void 0 ? void 0 : resultado.location.length) !== undefined) {
                countLocation = resultado === null || resultado === void 0 ? void 0 : resultado.location.length;
            }
            if (countLocation == 3) {
                for (let i = 0; i < 3; i++) {
                    if (getDistanciaMetros(resultado === null || resultado === void 0 ? void 0 : resultado.location[0].latitude, resultado === null || resultado === void 0 ? void 0 : resultado.location[i].longitude, this.latitude, this.longitude) <= 10)
                        result = true;
                }
                if (result)
                    next();
                else
                    next(new Error("AL"));
            }
            else
                next(new Error("ALN"));
        }
        else
            next();
    });
});
exports.record_model = (0, mongoose_1.model)("records", record_schema);
