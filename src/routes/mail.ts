import { Router } from "express";

import {
    mailing
} from "../controllers/mailing";

const router = Router();

router.get("/", mailing);

export default router;