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
exports.getAllmanageable_data = exports.updateManageableData = exports.getManageableDataByName = exports.getManageableDataById = exports.delete_manageable_data = exports.create_manageable_data = void 0;
const manageable_data_1 = require("../models/manageable_data");
const create_manageable_data = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let mes = yield manageable_data_1.manageable_data.create(Object.assign({}, req.body), { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Nouvelle entrée de data administrable ok ", data: mes });
});
exports.create_manageable_data = create_manageable_data;
const delete_manageable_data = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedMessage = yield manageable_data_1.manageable_data.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    yield manageable_data_1.manageable_data.destroy({ where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Data administrable bien effacée de la bdd avec sucess", data: deletedMessage });
});
exports.delete_manageable_data = delete_manageable_data;
const getManageableDataById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Mess = yield manageable_data_1.manageable_data.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de data administrable par ID effectuée avec sucess", data: Mess });
});
exports.getManageableDataById = getManageableDataById;
const getManageableDataByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nom_manageable_data = req.params.nom_data;
    const Mess = yield manageable_data_1.manageable_data.findOne({ where: { nom_manageable_data }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de data administrable par name effectuée avec sucess", data: Mess });
});
exports.getManageableDataByName = getManageableDataByName;
const updateManageableData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield manageable_data_1.manageable_data.update(Object.assign({}, req.body), { where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    const updatedUser = yield manageable_data_1.manageable_data.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "data administrable mise à jour avec sucess", data: updatedUser });
});
exports.updateManageableData = updateManageableData;
const getAllmanageable_data = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allmanageable_data = yield manageable_data_1.manageable_data.findAll({ logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Listing des données administrables effectué avec sucess", data: allmanageable_data });
});
exports.getAllmanageable_data = getAllmanageable_data;
// fonction pour send requette + detail en console.log
function sendToLogToConsole(sql, queryObject) {
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
}
