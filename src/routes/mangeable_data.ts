import { Router } from "express";

import {
    getAllmanageable_data
  
  } from "../controllers/manageable_data";

const router = Router();

router.get("/",  getAllmanageable_data);

export default router;