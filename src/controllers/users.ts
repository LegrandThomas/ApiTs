import { RequestHandler } from "express";

import { Users } from "../models/users";


export const createUser: RequestHandler = async (req, res, next) => {
  let c:number=200;
  let user:any = await Users.create({ ...req.body },{logging:(sql, queryObject) => {
    sendToLogToConsole(sql, queryObject)
  }}).catch((e: { code: string; }) => {
    if (e){c=500}
    else{c=200}
    });
    if(c==200){
  return res
  .status(200)
  .json({ message: "Utilisateur créé avec sucess",data:user})
      }else{
  return res
  .status(500)
  .json({ message: "Utilisateur avec cette adresse mail existe déjà en bdd" })}
}

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




function sendToLogToConsole (sql: string, queryObject: number | undefined) {  
  // console.log(sql);
  // console.log(queryObject);
 
}


