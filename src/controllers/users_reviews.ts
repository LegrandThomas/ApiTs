import { RequestHandler } from "express";

import {  Users_reviews} from "../models/users_reviews";

export const create_users_reviews: RequestHandler = async (req, res, next) => {
  let mes = await Users_reviews.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Nouvel avis utilisateur enregistré ", data: mes });
};


export const delete_users_reviews: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedMessage: Users_reviews | null = await Users_reviews.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  await Users_reviews.destroy({ where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Avis utilisateur effacé de la bdd avec sucess", data: deletedMessage });
};



export const getUsersReviewsById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const Mess: Users_reviews | null = await Users_reviews.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Recherche de l'avis utilisateur par ID effectuée avec sucess", data: Mess });
};


export const getUsersReviewsByName: RequestHandler = async (req, res, next) => {
   
  const  prenom_users_reviews = req.params.name;
  const Mess: Users_reviews | null = await Users_reviews.findOne({ where: { prenom_users_reviews},logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject) }});
  return res
    .status(200)
    .json({ message: "Recherche de l'avis utilisateur par name effectuée avec sucess", data: Mess });
};

export const updateUsersReviews: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Users_reviews.update({ ...req.body }, { where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  const updatedUserReviews: Users_reviews | null = await Users_reviews.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Avis utilisateur mis à jour avec sucess", data: updatedUserReviews });
};  

export const getAllUsersReviews: RequestHandler = async (req, res, next) => {
    const allUsersReviews: Users_reviews[] = await Users_reviews.findAll({logging:(sql, queryObject) => {
      sendToLogToConsole(sql, queryObject)
    }});
    return res
      .status(200)
      .json({ message: "Listing des avis utilisateurs effectué avec sucess", data: allUsersReviews });
  };
 
// fonction pour send requette + detail en console.log
function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
    console.log(sql);
    console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
  }