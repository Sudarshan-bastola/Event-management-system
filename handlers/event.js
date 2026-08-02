import { Router } from "express";
import { create, index, find, update, remove } from "../services/event.js";
import {
  createEventValidator,
  updateEventValidator,
} from "../validators/event.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Organizer creates event
router.post(
  "/",
  authorize("organizer"),
  createEventValidator,
  async (req, res, next) => {
    try {
      const event = await create({
        ...req.body,
        organizer: req.user.userId,
      });

      res.status(201).json(event);
    } catch (error) {
      next(error);
    }
  },
);

// Public
router.get("/", async (req, res, next) => {
  try {
    const events = await index();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
});

// Public
router.get("/:id", async (req, res, next) => {
  try {
    const event = await find({
      _id: req.params.id,
    });

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

// Organizer can update only own event
router.patch(
  "/:id",
  authorize("organizer"),
  updateEventValidator,
  async (req, res, next) => {
    try {
      const event = await update(req.params.id, req.body, req.user.userId);

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
);

// Organizer can delete only own event
router.delete("/:id", authorize("organizer"), async (req, res, next) => {
  try {
    const event = await remove(req.params.id, req.user.userId);

    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
});

export default router;
