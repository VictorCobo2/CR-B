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
exports.addZoneTouser = exports.passwordValidator = exports.login = exports.editUserNoPassword = exports.editUser = exports.deleteUser = exports.searchUser = exports.getAllUsers = exports.createUser = void 0;
const jwtGenerator_1 = require("../helpers/jwtGenerator");
const users_1 = require("../models/users");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hello");
    try {
        new users_1.users_model(req.body).save((error) => {
            if (error) {
                res.json({ msg: error });
            }
            else {
                res.json({ S: "Saved" });
            }
        });
    }
    catch (error) { }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield users_1.users_model.find({}, { password: 0 });
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.getAllUsers = getAllUsers;
const searchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield users_1.users_model.findById({ _id: id }, { password: 0 }).populate("zones", "-_id -watchman");
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
});
exports.searchUser = searchUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield users_1.users_model.deleteOne({ document: id });
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.deleteUser = deleteUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, pass } = req.params;
        const { level_user, name, lastnames, document, phone_number, last_name, password, state } = req.body;
        const data = yield users_1.users_model.updateOne({ $and: [{ document: id, pass: pass }] }, {
            $set: {
                document: document,
                last_name: last_name,
                phone_number: phone_number,
                lever_user: level_user,
                name: name,
                lastnames: lastnames,
                password: password,
                state: state,
            },
        }, { runValidators: true });
        res.json({ S: "put user" });
    }
    catch (error) {
        console.error(error);
        res.json({ msg: error });
    }
});
exports.editUser = editUser;
const editUserNoPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { level_user, name, document, phone_number, last_name, state, zones } = req.body;
        const data = yield users_1.users_model.updateOne({ _id: id }, {
            $set: {
                document: document,
                last_name: last_name,
                phone_number: phone_number,
                lever_user: level_user,
                name: name,
                state: state,
                zones: zones,
            },
        }, { runValidators: true });
        res.json({ S: "put user" });
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.editUserNoPassword = editUserNoPassword;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { document, password } = req.query;
        const data = yield users_1.users_model.findOne({
            $and: [{ document: document }, { password: password }],
        }, { password: 0 });
        if (data) {
            const token = yield (0, jwtGenerator_1.generarJwt)(data.id);
            res.json({ data, token });
        }
        else
            res.json({ A: "No fount" });
    }
    catch (error) {
        res.json({ A: error });
    }
});
exports.login = login;
const passwordValidator = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { document, password } = req.params;
        const data = yield users_1.users_model.findOne({
            $and: [{ document: document }, { password: password }],
        });
        if (data)
            res.json({ S: "good" });
        else
            res.json({ msg: "no fount" }).status(400);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.passwordValidator = passwordValidator;
const addZoneTouser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, id_zone } = req.params;
        const data = yield users_1.users_model.findByIdAndUpdate(id, { $addToSet: { zones: id_zone } }, { new: true, useFindAndModify: false });
        res.json(data);
    }
    catch (error) {
        res.json({ msg: error });
    }
});
exports.addZoneTouser = addZoneTouser;
