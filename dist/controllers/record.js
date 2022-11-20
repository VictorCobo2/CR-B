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
exports.searchRecordWithUser = exports.searchRecord = exports.getAllRecord = exports.addRecord = void 0;
const global_1 = require("../helpers/global");
const record_1 = require("../models/record");
const addRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        new record_1.record_model(req.body).save((error) => {
            if (error) {
                console.log(error);
                res.json({ msg: error.message });
            }
            else {
                res.json({ S: "Success" });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
});
exports.addRecord = addRecord;
const getAllRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield record_1.record_model.find({}, { $natural: -1 });
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.getAllRecord = getAllRecord;
const searchRecord = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield record_1.record_model.find({ zone_id: id });
        data ? res.json(data) : res.json({ A: "No fount" });
    }
    catch (error) {
        res.json(error);
    }
});
exports.searchRecord = searchRecord;
const searchRecordWithUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_watchman, zone_id, since, until } = req.params;
        if (id_watchman == "**") {
            const data = yield record_1.record_model.find({
                $and: [
                    { zone_id: zone_id },
                    {
                        date: {
                            $gte: since,
                            $lt: (0, global_1.sumDate)(until),
                        },
                    },
                ],
            });
            if (data.length == 0)
                res.json({ A: "No fount" });
            else
                res.json(data);
        }
        else {
            const data = yield record_1.record_model.find({
                $and: [
                    { zone_id: zone_id },
                    { id_watchman: id_watchman },
                    {
                        date: {
                            $gte: since,
                            $lt: (0, global_1.sumDate)(until),
                        },
                    },
                ],
            });
            if (data.length == 0)
                res.json({ A: "No fount" });
            else
                res.json(data);
        }
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.searchRecordWithUser = searchRecordWithUser;
