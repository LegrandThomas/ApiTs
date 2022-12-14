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
const users_reviews_1 = __importDefault(require("./routes/users_reviews"));
const earnings_simulator_1 = __importDefault(require("./routes/earnings_simulator"));
const config_1 = require("./db/config");
const body_parser_1 = require("body-parser");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const fs = __importStar(require("fs"));
const cors_1 = __importDefault(require("cors"));
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = (0, express_1.default)();
// const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/users", users_1.default);
app.use("/mail", contact_form_1.default);
app.use("/data", mangeable_data_1.default);
app.use("/avis", users_reviews_1.default);
app.use("/earning_simulator", earnings_simulator_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});
// app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    console.log("Connected to React");
    res.send({ message: "Hello World!" });
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
        res.status(201).send('acces autoris?? au dashboard ' + refreshToken);
        console.log("AccesToken g??n??r?? : " + accessToken + '\n');
        console.log("RefreshToken g??n??r?? : " + refreshToken + '\n');
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
        console.log("maintenant c'est ok !! ????");
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
    console.log("?????? Base de donn??es connect??e avec sucess ! \n");
})
    .catch((err) => {
    console.log("????????????  ! Erreur !   ????????????", err);
});
const httpsOptions = {
    key: fs.readFileSync('./config/key.pem'),
    cert: fs.readFileSync('./config/cert.pem')
};
// https.createServer(httpsOptions, app).listen(5000, () => {
//   console.log("???? :Server NodeJs d??mar?? sur le port :" + process.env.PORT)
// });
app.listen(5000, () => {
    console.log("???? :Server NodeJs d??mar?? sur le port :" + process.env.PORT);
});
