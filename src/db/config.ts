import { Sequelize } from "sequelize-typescript";
import { Todos } from "../models/todos";
import { Users } from "../models/users";
import { contact_form } from "../models/mailing";
require('dotenv').config()

// export default connection;
export const connection =new Sequelize('gtbuqdkd','gtbuqdkd','P3FrZufG7CUy5lmuzdwuiTcCD_77scrO',{
    host:process.env.hostpg,
    dialect:'postgres',
    logging: false,
    models: [Todos,Users,contact_form],
      });