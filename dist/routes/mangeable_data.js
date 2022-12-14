"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manageable_data_1 = require("../controllers/manageable_data");
const router = (0, express_1.Router)();
router.get("/", manageable_data_1.getAllmanageable_data);
router.post("/", manageable_data_1.create_manageable_data);
router.get("/:id", manageable_data_1.getManageableDataById);
router.get("/data/:nom_data", manageable_data_1.getManageableDataByName);
router.delete("/:id", manageable_data_1.delete_manageable_data);
router.put("/:id", manageable_data_1.updateManageableData);
exports.default = router;
