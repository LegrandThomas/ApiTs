import { RequestHandler } from "express";

import {  earnings_simulator} from "../models/earnings_simulator";

export const create_earnings_simulation: RequestHandler = async (req, res, next) => {
  let mes = await earnings_simulator.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Nouvelle simulation de gains enregistrée ", data: mes });
};


export const delete_earnings_simulation: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedMessage: earnings_simulator | null = await earnings_simulator.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  await earnings_simulator.destroy({ where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Simulation de gains de la bdd avec sucess", data: deletedMessage });
};



export const getEarningsSimulationById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const Mess: earnings_simulator | null = await earnings_simulator.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Recherche de la simulation de gains par ID effectuée avec sucess", data: Mess });
};


export const updateEarningsSimulation: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await earnings_simulator.update({ ...req.body }, { where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  const updatedUserReviews: earnings_simulator | null = await earnings_simulator.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Simulation de gains mis à jour avec sucess", data: updatedUserReviews });
};  

export const getAllEarningsSimulation: RequestHandler = async (req, res, next) => {
    const allUsersReviews: earnings_simulator[] = await earnings_simulator.findAll({logging:(sql, queryObject) => {
      sendToLogToConsole(sql, queryObject)
    }});
    return res
      .status(200)
      .json({ message: "Listing des simulations de gains effectué avec sucess", data: allUsersReviews });
  };
 
// fonction pour send requette + detail en console.log
function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
  }