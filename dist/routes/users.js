"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router_users = void 0;
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const validators_1 = require("../helpers/validators");
exports.router_users = express_1.default.Router();
exports.router_users.post("/users", validators_1.JwtValidator, users_1.createUser);
exports.router_users.get("/users", validators_1.JwtValidator, users_1.getAllUsers);
exports.router_users.get("/users/:id", validators_1.JwtValidator, users_1.searchUser);
exports.router_users.delete("/users/:id", validators_1.JwtValidator, users_1.deleteUser);
exports.router_users.put("/users/:id/:password", validators_1.JwtValidator, users_1.editUser);
exports.router_users.put("/users/:id", validators_1.JwtValidator, users_1.editUserNoPassword);
exports.router_users.get("/login", users_1.login);
exports.router_users.get("/passsword/:document/:password", validators_1.JwtValidator, users_1.passwordValidator);
//-----------zone--------------------//
exports.router_users.put("/aggZone/:id/:id_zone", validators_1.JwtValidator, users_1.addZoneTouser);
