import { RequestHandler } from "express";

import { manageable_data } from "../models/manageable_data";

export const create_manageable_data: RequestHandler = async (req, res, next) => {
  let mes = await manageable_data.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Nouvelle entrée de data administrable ok ", data: mes });
};


export const delete_manageable_data: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedMessage: manageable_data | null = await manageable_data.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  await manageable_data.destroy({ where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Data administrable bien effacée de la bdd avec sucess", data: deletedMessage });
};



export const getManageableDataById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const Mess: manageable_data | null = await manageable_data.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Recherche de data administrable par ID effectuée avec sucess", data: Mess });
};


export const getManageableDataByName: RequestHandler = async (req, res, next) => {
  const  nom_manageable_data = req.params.nom_data;
  const Mess: manageable_data | null = await manageable_data.findOne({ where: { nom_manageable_data },logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject) }});
  return res
    .status(200)
    .json({ message: "Recherche de data administrable par name effectuée avec sucess", data: Mess });
};

export const updateManageableData: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await manageable_data.update({ ...req.body }, { where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  const updatedUser: manageable_data | null = await manageable_data.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "data administrable mise à jour avec sucess", data: updatedUser });
};

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
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
  }