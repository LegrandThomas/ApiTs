"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mailing_1 = require("../controllers/mailing");
const router = (0, express_1.Router)();
router.get("/", mailing_1.mailing);
exports.default = router;
