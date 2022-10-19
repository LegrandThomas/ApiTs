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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailing = exports.getAllmess = exports.updateMessage = exports.getMessageByName = exports.getMessageById = exports.delete_message = exports.create_message = void 0;
const mailing_1 = require("../models/mailing");
const nodemailer_1 = __importDefault(require("nodemailer"));
let date = new Date();
const create_message = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let mes = yield mailing_1.contact_form.create(Object.assign({}, req.body), { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "message enregistré avec sucess le " + date, data: mes });
});
exports.create_message = create_message;
const delete_message = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedMessage = yield mailing_1.contact_form.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    yield mailing_1.contact_form.destroy({ where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Message effacé de la bdd avec sucess", data: deletedMessage });
});
exports.delete_message = delete_message;
const getMessageById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const Mess = yield mailing_1.contact_form.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche du message par ID effectuée avec sucess", data: Mess });
});
exports.getMessageById = getMessageById;
const getMessageByName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const nom_contact = req.params.nom_contact;
    const Mess = yield mailing_1.contact_form.findOne({ where: { nom_contact }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Recherche du message par name effectuée avec sucess", data: Mess });
});
exports.getMessageByName = getMessageByName;
const updateMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield mailing_1.contact_form.update(Object.assign({}, req.body), { where: { id }, logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    const updatedUser = yield mailing_1.contact_form.findByPk(id, { logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Message mis à jour avec sucess", data: updatedUser });
});
exports.updateMessage = updateMessage;
const getAllmess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allmess = yield mailing_1.contact_form.findAll({ logging: (sql, queryObject) => {
            sendToLogToConsole(sql, queryObject);
        } });
    return res
        .status(200)
        .json({ message: "Listing des mails effectué avec sucess", data: allmess });
});
exports.getAllmess = getAllmess;
// test mail 
const mailing = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: process.env.HMailer,
        port: 587,
        secure: false,
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false,
        },
        auth: {
            user: 'well.eat.test@gmail.com',
            pass: process.env.PASS
        }
    });
    let mailOptions = {
        from: 'well.eat.test@gmail.com',
        to: 'pro.legrand.thomas@gmail.com',
        cc: 'well.eat.test@gmail.com',
        subject: 'Péponse automatique',
        text: 'Votre mail à bien était pris en compte\nCeci est une réponse automatique\n Merci de ne pas répondre'
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        // console.log(info);
        console.log('✨mail délivré avec sucess✨\n');
        console.log("🚀 envoyé depuis :" + mailOptions.from);
        console.log('🚀 envoyé vers 👨:' + mailOptions.to + "\n");
        console.log("Sujet + Contenu du message envoyé:\n");
        console.log("sujet :" + mailOptions.subject + "\nmessage :" + mailOptions.text);
        console.log("en date du : " + Date());
        console.log("Mail également transmis pour sauvegarde à : " + mailOptions.cc + "\n");
        return res
            .json({ message: "Mail envoyé avec sucess!!!!!!" });
    });
});
exports.mailing = mailing;
// fin test
// fonction pour send requette + detail en console.log
function sendToLogToConsole(sql, queryObject) {
    // save the `sql` query in Elasticsearch
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
}
