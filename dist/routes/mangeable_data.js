"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const manageable_data_1 = require("../controllers/manageable_data");
const router = (0, express_1.Router)();
router.get("/", manageable_data_1.getAllmanageable_data);
exports.default = router;
