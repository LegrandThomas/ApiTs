import { Sequelize } from "sequelize-typescript";
import { Users } from "../models/users";
import { manageable_data } from "../models/manageable_data";
import { contact_form } from "../models/contact_form";
import { Users_reviews } from "../models/users_reviews";
import { earnings_simulator } from "../models/earnings_simulator";
require('dotenv').config()


// export default connection;
export const connection =new Sequelize('gtbuqdkd','gtbuqdkd','P3FrZufG7CUy5lmuzdwuiTcCD_77scrO',{
    host:process.env.hostpg,
    dialect:'postgres',
    logging: false,
    models: [Users,contact_form,manageable_data,Users_reviews,earnings_simulator],
    pool: {
      idle: 10000, // milliseconds
      evict: 20000, // milliseconds
  }
      });