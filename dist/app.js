"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("./routes/users"));
const mangeable_data_1 = __importDefault(require("./routes/mangeable_data"));
const contact_form_1 = __importDefault(require("./routes/contact_form"));
const config_1 = require("./db/config");
const body_parser_1 = require("body-parser");
const https = __importStar(require("https"));
const fs = __importStar(require("fs"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/users", users_1.default);
app.use("/mail", contact_form_1.default);
app.use("/data", mangeable_data_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
const user = {
    name: process.env.NameAdminUser,
    admin: true,
};
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}
function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}
app.post('/api/dashboard/:name', (req, res) => {
    if (req.params.name !== process.env.AdminUser) {
        res.status(401).send('invalide credentials');
        return;
    }
    else {
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        res.status(201).send('acces autorisé au dashboard ' + refreshToken);
        console.log("AccesToken généré : " + accessToken + '\n');
        console.log("RefreshToken généré : " + refreshToken + '\n');
    }
});
app.post('/api/refreshToken', (req, res) => {
    const authHeader = req.headers['authorization'];
    console.log("autHeader : " + authHeader + '\n');
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token : " + token + '\n');
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        delete user.iat;
        delete user.exp;
        const refreshedToken = generateAccessToken(user);
        console.log("maintenant c'est ok !! 😉");
        res.send({
            accessToken: refreshedToken,
        });
    });
});
app.get('/api/me', (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(401);
        }
        else {
            user.name = "***********";
            res.send(user);
            next();
        }
    });
});
config_1.connection
    .sync()
    .then(() => {
    console.log("⚡️ Base de données connectée avec sucess ! \n");
})
    .catch((err) => {
    console.log("🔥🔥🔥  ! Erreur !   🔥🔥🔥", err);
});
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
https.createServer(httpsOptions, app).listen(3000, () => {
    console.log("💻 :Server NodeJs démaré sur le port :" + process.env.PORT);
});
