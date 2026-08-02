import { Router } from "express";
import { create, index, find, update, remove } from "../services/payment.js";

import {
  createPaymentValidator,
  updatePaymentValidator,
} from "../validators/payment.js";

import { authorize } from "../middleware/authorize.js";

const router = Router();

// attendee pays
router.post(
  "/",
  authorize("attendee"),
  createPaymentValidator,
  async (req, res, next) => {
    try {
      const payment = await create(req.body, req.user.userId);

      res.status(201).json(payment);
    } catch (error) {
      next(error);
    }
  },
);

// admin & organizer
router.get("/", authorize("admin", "organizer"), async (req, res, next) => {
  try {
    const payments = await index(req.user.userId, req.user.role);

    res.json(payments);
  } catch (error) {
    next(error);
  }
});

// all authenticated users
router.get("/:id", async (req, res, next) => {
  try {
    const payment = await find(req.params.id, req.user.userId, req.user.role);

    res.json(payment);
  } catch (error) {
    next(error);
  }
});

// organizer changes payment status
router.patch(
  "/:id",
  authorize("organizer"),
  updatePaymentValidator,
  async (req, res, next) => {
    try {
      const payment = await update(req.params.id, req.body, req.user.userId);

      res.json(payment);
    } catch (error) {
      next(error);
    }
  },
);

// admin deletes payment
router.delete("/:id", authorize("admin"), async (req, res, next) => {
  try {
    const payment = await remove(req.params.id);

    res.json(payment);
  } catch (error) {
    next(error);
  }
});

export default router;
