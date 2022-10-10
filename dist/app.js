"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const users_1 = __importDefault(require("./routes/users"));
const config_1 = __importDefault(require("./db/config"));
const body_parser_1 = require("body-parser");
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/todos", todos_1.default);
app.use("/users", users_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
config_1.default
    .sync()
    .then(() => {
    console.log("⚡️ Base de données connectée avec sucess ! \n");
})
    .catch((err) => {
    console.log("🔥🔥🔥  ! Erreur !   🔥🔥🔥", err);
});
app.listen(3000, () => {
    console.log("💻 :Server NodeJs démaré sur le port :" + process.env.PORT);
});
// test mail 
const nodemailer_1 = __importDefault(require("nodemailer"));
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
    console.log('✨mail délivré avec sucess✨\n');
    console.log("🚀 envoyé depuis :" + mailOptions.from);
    console.log('🚀 envoyé vers 👨:' + mailOptions.to + "\n");
    console.log("Sujet + Contenu du messag envoyé:\n");
    console.log("sujet :" + mailOptions.subject + "\nmessage :" + mailOptions.text);
    console.log("en date du : " + Date());
    console.log("Mail également transmis pour sauvegarde à : " + mailOptions.cc + "\n");
});
// fin test
