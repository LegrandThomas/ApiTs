import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/todos";
import { Users } from "../models/users";
import { contact_form } from "../models/mailing";
require('dotenv').config()

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
export const connection =new Sequelize('gtbuqdkd','gtbuqdkd','P3FrZufG7CUy5lmuzdwuiTcCD_77scrO',{
    host:'mouse.db.elephantsql.com',
    dialect:'postgres',
    logging: false,
    models: [Todos,Users,contact_form],
      });