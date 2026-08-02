import { Router } from "express";
import { create, index, find, update, remove } from "../services/venue.js";
import {
  createVenueValidator,
  updateVenueValidator,
} from "../validators/venue.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.post(
  "/",
  authorize("admin"),
  createVenueValidator,
  async (req, res, next) => {
    try {
      const venue = await create(req.body);
      res.status(201).json(venue);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", async (req, res, next) => {
  try {
    const venues = await index();
    res.status(200).json(venues);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const venue = await find({ _id: req.params.id });
    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  authorize("admin"),
  updateVenueValidator,
  async (req, res, next) => {
    try {
      const venue = await update(req.params.id, req.body);
      res.status(200).json(venue);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", authorize("admin"), async (req, res, next) => {
  try {
    const venue = await remove(req.params.id);
    res.status(200).json(venue);
  } catch (error) {
    next(error);
  }
});

export default router;
