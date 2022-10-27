import { Router } from "express";

import {
    mailing,
    create_message,
    getAllmess,
    delete_message,
    getMessageById,
    updateMessage,
    getMessageByName,
    getMessageByDemandeRappel,
    getMessageByDemandeNewsletter
} from "../controllers/contact_form";

const router = Router();

router.get("/", mailing);
router.get("/listmail",getAllmess);
router.post("/",create_message);
router.delete("/:id", delete_message);
router.get("/:id",getMessageById);

router.get("/listmail/:nom_contact",getMessageByName);
router.get("/listrappel/:demande_rappel",getMessageByDemandeRappel);
router.get("/listnewsletter/:inscrit_newsletter",getMessageByDemandeNewsletter);

router.put("/:id", updateMessage);
export default router;
