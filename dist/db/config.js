"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const todos_1 = require("../models/todos");
const users_1 = require("../models/users");
require('dotenv').config();
const connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    logging: false,
    models: [todos_1.Todos, users_1.Users],
});
exports.default = connection;
