"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
const users_1 = __importDefault(require("./routes/users"));
const mail_1 = __importDefault(require("./routes/mail"));
const config_1 = __importDefault(require("./db/config"));
const body_parser_1 = require("body-parser");
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use("/todos", todos_1.default);
app.use("/users", users_1.default);
app.use("/mail", mail_1.default);
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
