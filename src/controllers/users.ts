import { RequestHandler } from "express";

import { Users } from "../models/users";


export const createUser: RequestHandler = async (req, res, next) => {
  let user:any = await Users.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }}).catch((e: { code: string; }) => {
    console.log(e);
    if (e){
      console.log("erreur violation duplicata");
      return res
      .status(500)
      .json({ message: "Utilisateur avec cette adresse mail existe déjà en bdd" });
  }else{
  return res
    .status(200)
    .json({ message: "Utilisateur créé avec sucess", data: user });
  }})};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser: Users | null = await Users.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  await Users.destroy({ where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Utilisateur effacé avec sucess", data: deletedUser });
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  const allUsers: Users[] = await Users.findAll({logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
 
  return res
    .status(200)
    .json({ message: "Listing des utilisateurs effectué avec sucess", data: allUsers });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const User: Users | null = await Users.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Recherche d'utilisateur par ID effectué avec sucess", data: User });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Users.update({ ...req.body }, { where: { id } ,logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  const updatedUser: Users | null = await Users.findByPk(id,{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }});
  return res
    .status(200)
    .json({ message: "Utilisateur mis à jour avec sucess", data: updatedUser });
};

// fonction pour send requette + detail en console.log
function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
  // save the `sql` query in Elasticsearch
  console.log(sql);
  console.log(queryObject); // use the queryObject if needed (e.g. for debugging)
 
}


