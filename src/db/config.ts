import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users";
import { manageable_data } from "../models/manageable_data";
import { contact_form } from "../models/contact_form";
require('dotenv').config()

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
export const connection =new Sequelize('gtbuqdkd','gtbuqdkd','P3FrZufG7CUy5lmuzdwuiTcCD_77scrO',{
    host:process.env.DATABASE_URL,
    dialect:'postgres',
    logging: true,
    models: [Users,contact_form,manageable_data],
      });