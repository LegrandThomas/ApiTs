"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const todos_1 = require("../models/todos");
const users_1 = require("../models/users");
const mailing_1 = require("../models/mailing");
require('dotenv').config();
// const connection = new Sequelize({
//   dialect: "mysql",
//   host: process.env.HOST,
//   username: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
//   logging: false,
//   models: [Todos,Users,contact_form],
// });
// export default connection;
exports.connection = new sequelize_typescript_1.Sequelize('gtbuqdkd', 'gtbuqdkd', 'P3FrZufG7CUy5lmuzdwuiTcCD_77scrO', {
    host: 'mouse.db.elephantsql.com',
    dialect: 'postgres',
    logging: false,
    models: [todos_1.Todos, users_1.Users, mailing_1.contact_form],
});
