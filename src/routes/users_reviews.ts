import { Router } from "express";

import {
    create_users_reviews,
    delete_users_reviews,
    getAllUsersReviews,
    updateUsersReviews,
    getUsersReviewsById,
    getUsersReviewsByName
  } from "../controllers/users_reviews";

const router = Router();

router.post("/", create_users_reviews);

router.get("/",  getAllUsersReviews);

router.get("/:id",getUsersReviewsById);

router.get("/AvisUtilisateurs/:name",getUsersReviewsByName);

router.put("/:id", updateUsersReviews);

router.delete("/:id", delete_users_reviews);

export default router;