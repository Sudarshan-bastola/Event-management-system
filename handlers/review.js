import { Router } from "express";
import { create, index, find, update, remove } from "../services/review.js";

import {
  createReviewValidator,
  updateReviewValidator,
} from "../validators/review.js";

import { authorize } from "../middleware/authorize.js";

const router = Router();

// Create Review
router.post(
  "/",
  authorize("attendee"),
  createReviewValidator,
  async (req, res, next) => {
    try {
      const review = await create({
        ...req.body,
        user: req.user.userId,
      });

      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  },
);

// Public
router.get("/", async (req, res, next) => {
  try {
    const reviews = await index();

    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// Public
router.get("/:id", async (req, res, next) => {
  try {
    const review = await find(req.params.id);

    res.json(review);
  } catch (error) {
    next(error);
  }
});

// Update own review
router.patch(
  "/:id",
  authorize("attendee"),
  updateReviewValidator,
  async (req, res, next) => {
    try {
      const review = await update(req.params.id, req.body, req.user.userId);

      res.json(review);
    } catch (error) {
      next(error);
    }
  },
);

// Delete own review
router.delete("/:id", authorize("attendee"), async (req, res, next) => {
  try {
    const review = await remove(req.params.id, req.user.userId);

    res.json(review);
  } catch (error) {
    next(error);
  }
});

export default router;
