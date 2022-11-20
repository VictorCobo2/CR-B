"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.building_model = void 0;
const mongoose_1 = require("mongoose");
const building_schema = new mongoose_1.Schema({
    adress: {
        type: String,
        rerquire: true
    },
    zone: {
        type: [],
        required: true
    },
    watchman: {
        type: String,
        rerquire: true
    },
    qr: {
        type: String,
        rerquire: true
    },
});
exports.building_model = (0, mongoose_1.model)("building", building_schema);
