import { Router } from "express";

import {
    createUser,
    deleteUser,
    getAllUser,
    updateUser,
    getUserById,
  } from "../controllers/users";

const router = Router();

router.post("/", createUser);

router.get("/",  getAllUser);

router.get("/:id",getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;