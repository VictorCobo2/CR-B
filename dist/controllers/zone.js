"use strict";
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
exports.aggLocation = exports.addWatchman = exports.zoneNames = exports.deletePoint = exports.deleteZone = exports.addPoint = exports.searchRecordZone = exports.searchZone = exports.getAllZones = exports.createZone = void 0;
const global_1 = require("../helpers/global");
const zone_1 = require("../models/zone");
const users_1 = require("../models/users");
const createZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new zone_1.zone_model(req.body).save((error) => {
            if (error)
                res.json({ msg: error });
            else
                res.json({ S: "success" });
        });
    }
    catch (error) {
        res.json({ A: "No fount", error });
        console.error(error);
    }
});
exports.createZone = createZone;
const getAllZones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("que gonorrea perro");
        const data = yield zone_1.zone_model.find();
        res.json(data);
    }
    catch (error) {
        res.json({ A: "No fount", error });
        console.error(error);
    }
});
exports.getAllZones = getAllZones;
const searchZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield zone_1.zone_model.findOne({ _id: id }).populate("users", "-_id -zones");
        res.json(data);
    }
    catch (error) {
        res.json({ A: "No fount", error });
        console.error(error);
    }
});
exports.searchZone = searchZone;
const searchRecordZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield zone_1.zone_model
            .aggregate([
            {
                $lookup: {
                    from: "records",
                    localField: "_id",
                    foreignField: "zone_id",
                    as: "record",
                },
            },
        ])
            .match({ _id: id });
        res.json(data);
    }
    catch (error) {
        res.json({ A: "No fount", error });
        console.error(error);
    }
});
exports.searchRecordZone = searchRecordZone;
const addPoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const document = yield zone_1.zone_model.findOne({ _id: id });
        let exist = false;
        if (document != null) {
            let countPoints = 0;
            countPoints = document === null || document === void 0 ? void 0 : document.point.length;
            for (let i = 0; i < countPoints; i++) {
                if ((document === null || document === void 0 ? void 0 : document.point[i].point_name) === req.body.point_name) {
                    exist = true;
                    break;
                }
            }
        }
        if (exist == false) {
            const name = req.body.point_name;
            const datos = {
                id,
                adress: document === null || document === void 0 ? void 0 : document.adress,
                name_point: name,
            };
            const qr = yield (0, global_1.qrGenerator)(datos);
            const point = {
                point_name: name,
                qr,
                location: [],
            };
            const data = yield zone_1.zone_model.updateOne({ _id: id }, { $push: { point: point } }, { runValidators: true });
            exist = false;
            res.json({ S: "success" });
        }
        else {
            if (document)
                res.json({ A: "point exist" });
            else
                res.json({ E: "No fount" });
        }
    }
    catch (error) {
        res.json({ A: "No fount", error });
        console.error(error);
    }
});
exports.addPoint = addPoint;
const deleteZone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield zone_1.zone_model.deleteOne({ _id: id });
        if (data.deletedCount > 0)
            res.json({ S: "success" });
        else
            res.json({ msg: data });
    }
    catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
});
exports.deleteZone = deleteZone;
const deletePoint = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, id_point } = req.params;
        console.log(id, id_point);
        const zone = yield zone_1.zone_model.findOne({ _id: id });
        if (zone) {
            const data = yield zone_1.zone_model.updateOne({ _id: id }, { $pull: { point: { _id: id_point } } });
            if (data.modifiedCount > 0)
                res.json({ S: "delete" });
            else
                res.json({ A: "incorrect id point" });
        }
        else {
            res.json({ N1: "no fount" });
        }
    }
    catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
});
exports.deletePoint = deletePoint;
const zoneNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield zone_1.zone_model.find({}, { adress: 1 });
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.zoneNames = zoneNames;
const addWatchman = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { id_watchman } = req.params;
        const watchman = yield users_1.users_model.findOne({ _id: id_watchman });
        if (watchman == null)
            res.json("no fount");
        else if ((watchman === null || watchman === void 0 ? void 0 : watchman.level_user) === "WATCHMAN") {
            const watchman_id = {
                watchman_id: watchman === null || watchman === void 0 ? void 0 : watchman._id,
            };
            const data = yield zone_1.zone_model.updateOne({ _id: id }, { $push: { watchman: watchman_id } }, { runValidators: true });
            res.json(data);
        }
        else {
            res.json("admin");
        }
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.addWatchman = addWatchman;
const aggLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let elementIndex;
        const { id, latitude, longitude, point_name } = req.body;
        const datos = {
            latitude,
            longitude,
        };
        const data = yield zone_1.zone_model.findById({ _id: id });
        if (data) {
            const points = data === null || data === void 0 ? void 0 : data.point;
            elementIndex = points === null || points === void 0 ? void 0 : points.findIndex((obj) => obj.point_name == point_name);
            console.log(points[elementIndex].required_location);
            if (points[elementIndex].required_location === true) {
                if (elementIndex !== -1) {
                    if (points[elementIndex].location.length >= 3)
                        res.json({ ZM: "Ya existen las 3 ubicaciones" });
                    else {
                        points[elementIndex].location.push(datos);
                        const data2 = yield zone_1.zone_model.updateOne({ _id: id }, {
                            $set: {
                                point: points,
                            },
                        });
                        res.json({ S: `${points[elementIndex].location.length}` });
                    }
                }
            }
            else
                res.json({ LZN: "Location incative" });
        }
        else
            res.json({ AZ: "No fount zone" });
    }
    catch (error) {
        res.json({ A: error });
    }
});
exports.aggLocation = aggLocation;
const aggZoneToWatchman = function (id_watchman, id_zone) {
    return __awaiter(this, void 0, void 0, function* () {
        //res.json({ S: "success", longitude:longitude, latitude:latitude });
        //res.json({ AP: "No fount point" });
        const data = yield users_1.users_model.updateOne({ _id: id_watchman }, { $push: {} });
    });
};
