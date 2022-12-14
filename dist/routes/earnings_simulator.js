"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const earnings_simulator_1 = require("../controllers/earnings_simulator");
const router = (0, express_1.Router)();
router.post("/", earnings_simulator_1.create_earnings_simulation);
router.get("/", earnings_simulator_1.getAllEarningsSimulation);
router.get("/:id", earnings_simulator_1.getEarningsSimulationById);
router.put("/:id", earnings_simulator_1.updateEarningsSimulation);
router.delete("/:id", earnings_simulator_1.delete_earnings_simulation);
exports.default = router;
