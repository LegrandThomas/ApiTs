import { Router } from "express";

import {
    getAllmanageable_data,
    create_manageable_data,
    delete_manageable_data,
    getManageableDataById,
    getManageableDataByName,
    updateManageableData
  } from "../controllers/manageable_data";

const router = Router();

router.get("/",  getAllmanageable_data);
router.post("/",create_manageable_data);
router.get("/:id",getManageableDataById);
router.get("/data/:nom_data",getManageableDataByName)
router.delete("/:id",delete_manageable_data);
router.put("/:id",updateManageableData);

export default router;