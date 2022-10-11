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
exports.mailing = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
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
        subject: 'Mail test',
        text: 'petit test ;)'
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
