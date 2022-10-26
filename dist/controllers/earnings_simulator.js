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
exports.getAllEarningsSimulation = exports.updateEarningsSimulation = exports.getEarningsSimulationById = exports.delete_earnings_simulation = exports.create_earnings_simulation = void 0;
const earnings_simulator_1 = require("../models/earnings_simulator");
const create_earnings_simulation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let mes = yield earnings_simulator_1.earnings_simulator.create(Object.assign({}, req.body), { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Nouvelle simulation de gains enregistrée ", data: mes });
});
exports.create_earnings_simulation = create_earnings_simulation;
const delete_earnings_simulation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedMessage = yield earnings_simulator_1.earnings_simulator.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    yield earnings_simulator_1.earnings_simulator.destroy({ where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Simulation de gains de la bdd avec sucess", data: deletedMessage });
});
exports.delete_earnings_simulation = delete_earnings_simulation;
const getEarningsSimulationById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Mess = yield earnings_simulator_1.earnings_simulator.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de la simulation de gains par ID effectuée avec sucess", data: Mess });
});
exports.getEarningsSimulationById = getEarningsSimulationById;
const updateEarningsSimulation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield earnings_simulator_1.earnings_simulator.update(Object.assign({}, req.body), { where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    const updatedUserReviews = yield earnings_simulator_1.earnings_simulator.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Simulation de gains mis à jour avec sucess", data: updatedUserReviews });
});
exports.updateEarningsSimulation = updateEarningsSimulation;
const getAllEarningsSimulation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsersReviews = yield earnings_simulator_1.earnings_simulator.findAll({ logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Listing des simulations de gains effectué avec sucess", data: allUsersReviews });
});
exports.getAllEarningsSimulation = getAllEarningsSimulation;
// fonction pour send requette + detail en console.log
function sendToLogToConsole(sql, queryObject) {
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
}
