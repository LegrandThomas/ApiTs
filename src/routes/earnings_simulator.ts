import { Router } from "express";

import {
    create_earnings_simulation,
    delete_earnings_simulation,
    getAllEarningsSimulation,
    updateEarningsSimulation,
    getEarningsSimulationById,
  } from "../controllers/earnings_simulator";

const router = Router();

router.post("/", create_earnings_simulation);

router.get("/",  getAllEarningsSimulation);

router.get("/:id", getEarningsSimulationById);

router.put("/:id", updateEarningsSimulation);

router.delete("/:id", delete_earnings_simulation);

export default router;