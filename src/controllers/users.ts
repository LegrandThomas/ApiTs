import { RequestHandler } from "express";

import { Users } from "../models/users";

export const createUser: RequestHandler = async (req, res, next) => {
  let user = await Users.create({ ...req.body });
  return res
    .status(200)
    .json({ message: "Utilisateur créé avec sucess", data: user });
};

export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser: Users | null = await Users.findByPk(id);
  await Users.destroy({ where: { id } });
  return res
    .status(200)
    .json({ message: "Utilisateur effacé avec sucess", data: deletedUser });
};

export const getAllUser: RequestHandler = async (req, res, next) => {
  const allUsers: Users[] = await Users.findAll();
  return res
    .status(200)
    .json({ message: "Listing des utilisateurs effectué avec sucess", data: allUsers });
};

export const getUserById: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  const User: Users | null = await Users.findByPk(id);
  return res
    .status(200)
    .json({ message: "Recherche d'utilisateur par ID effectué avec sucess", data: User });
};

export const updateUser: RequestHandler = async (req, res, next) => {
  const { id } = req.params;
  await Users.update({ ...req.body }, { where: { id } });
  const updatedUser: Users | null = await Users.findByPk(id);
  return res
    .status(200)
    .json({ message: "Utilisateur mis à jour avec sucess", data: updatedUser });
};