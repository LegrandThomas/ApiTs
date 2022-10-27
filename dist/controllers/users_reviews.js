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
exports.getAllUsersReviews = exports.updateUsersReviews = exports.getUsersReviewsPinTrue = exports.getUsersReviewsByName = exports.getUsersReviewsById = exports.delete_users_reviews = exports.create_users_reviews = void 0;
const users_reviews_1 = require("../models/users_reviews");
const create_users_reviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let mes = yield users_reviews_1.Users_reviews.create(Object.assign({}, req.body), { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Nouvel avis utilisateur enregistré ", data: mes });
});
exports.create_users_reviews = create_users_reviews;
const delete_users_reviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedMessage = yield users_reviews_1.Users_reviews.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    yield users_reviews_1.Users_reviews.destroy({ where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Avis utilisateur effacé de la bdd avec sucess", data: deletedMessage });
});
exports.delete_users_reviews = delete_users_reviews;
const getUsersReviewsById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Mess = yield users_reviews_1.Users_reviews.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de l'avis utilisateur par ID effectuée avec sucess", data: Mess });
});
exports.getUsersReviewsById = getUsersReviewsById;
const getUsersReviewsByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const prenom_users_reviews = req.params.name;
    const Mess = yield users_reviews_1.Users_reviews.findOne({ where: { prenom_users_reviews }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de l'avis utilisateur par name effectuée avec sucess", data: Mess });
});
exports.getUsersReviewsByName = getUsersReviewsByName;
const getUsersReviewsPinTrue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pin_users_reviews = req.params.pin;
    const Mess = yield users_reviews_1.Users_reviews.findOne({ where: { pin_users_reviews }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche de l'avis utilisateur épinglé effectuée avec sucess", data: Mess });
});
exports.getUsersReviewsPinTrue = getUsersReviewsPinTrue;
const updateUsersReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield users_reviews_1.Users_reviews.update(Object.assign({}, req.body), { where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    const updatedUserReviews = yield users_reviews_1.Users_reviews.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Avis utilisateur mis à jour avec sucess", data: updatedUserReviews });
});
exports.updateUsersReviews = updateUsersReviews;
const getAllUsersReviews = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsersReviews = yield users_reviews_1.Users_reviews.findAll({ logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Listing des avis utilisateurs effectué avec sucess", data: allUsersReviews });
});
exports.getAllUsersReviews = getAllUsersReviews;
// fonction pour send requette + detail en console.log
function sendToLogToConsole(sql, queryObject) {
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
}
