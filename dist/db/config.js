"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("../models/users");
const manageable_data_1 = require("../models/manageable_data");
const contact_form_1 = require("../models/contact_form");
require('dotenv').config();
// const connection = new Sequelize({
//   dialect: "mysql",
//   host: process.env.HOST,
//   username: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DB,
//   logging: false,
//   models: [Users,contact_form],
// });
// export default connection;
exports.connection = new sequelize_typescript_1.Sequelize('gtbuqdkd', 'gtbuqdkd', 'P3FrZufG7CUy5lmuzdwuiTcCD_77scrO', {
    host: 'mouse.db.elephantsql.com',
    dialect: 'postgres',
    logging: false,
    models: [users_1.Users, contact_form_1.contact_form, manageable_data_1.manageable_data],
});
