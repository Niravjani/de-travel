import express from "express";
import { createReview } from "../controllers/reviewController.js";
import { verifyUser } from "../utils/verifyToken.js"; // You'll need to create this

const router = express.Router();

// POST /api/v1/reviews/:tourId
router.post("/:tourId", verifyUser, createReview);

export default router;