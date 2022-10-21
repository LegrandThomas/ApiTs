import { RequestHandler } from "express";

import { manageable_data } from "../models/manageable_data";


export const getAllmanageable_data: RequestHandler = async (req, res, next) => {
    const allmanageable_data: manageable_data[] = await manageable_data.findAll({logging:(sql, queryObject) => {
      sendToLogToConsole(sql, queryObject)
    }});
   
    return res
      .status(200)
      .json({ message: "Listing des données administrables effectué avec sucess", data: allmanageable_data });
  };

  
// fonction pour send requette + detail en console.log
function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
    // save the `sql` query in Elasticsearch
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
  }