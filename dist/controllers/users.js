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
exports.updateUser = exports.getUserById = exports.getAllUser = exports.deleteUser = exports.createUser = void 0;
const users_1 = require("../models/users");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield users_1.Users.create(Object.assign({}, req.body));
    return res
        .status(200)
        .json({ message: "Utilisateur créé avec sucess", data: user });
});
exports.createUser = createUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedUser = yield users_1.Users.findByPk(id);
    yield users_1.Users.destroy({ where: { id } });
    return res
        .status(200)
        .json({ message: "Utilisateur effacé avec sucess", data: deletedUser });
});
exports.deleteUser = deleteUser;
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield users_1.Users.findAll();
    return res
        .status(200)
        .json({ message: "Listing des utilisateurs effectué avec sucess", data: allUsers });
});
exports.getAllUser = getAllUser;
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const User = yield users_1.Users.findByPk(id);
    return res
        .status(200)
        .json({ message: "Recherche d'utilisateur par ID effectué avec sucess", data: User });
});
exports.getUserById = getUserById;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield users_1.Users.update(Object.assign({}, req.body), { where: { id } });
    const updatedUser = yield users_1.Users.findByPk(id);
    return res
        .status(200)
        .json({ message: "Utilisateur mis à jour avec sucess", data: updatedUser });
});
exports.updateUser = updateUser;
