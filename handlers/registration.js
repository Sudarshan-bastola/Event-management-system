import { Router } from "express";
import {
  create,
  index,
  find,
  update,
  remove,
} from "../Services/registration.js";
import {
  createRegistrationValidator,
  updateRegistrationValidator,
} from "../validators/registration.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

// Attendee registers for an event
router.post(
  "/",
  authorize("attendee"),
  createRegistrationValidator,
  async (req, res, next) => {
    try {
      const registration = await create({
        ...req.body,
        user: req.user.userId,
      });

      res.status(201).json(registration);
    } catch (error) {
      next(error);
    }
  },
);

// Admin & Organizer can see all registrations
router.get("/", authorize("admin", "organizer"), async (req, res, next) => {
  try {
    const registrations = await index();
    res.status(200).json(registrations);
  } catch (error) {
    next(error);
  }
});

// Attendee can view own registration
// Admin & Organizer can view any registration
router.get("/:id", async (req, res, next) => {
  try {
    const registration = await find(
      req.params.id,
      req.user.userId,
      req.user.role,
    );

    res.status(200).json(registration);
  } catch (error) {
    next(error);
  }
});

// Organizer confirms/cancels registration
router.patch(
  "/:id",
  authorize("organizer"),
  updateRegistrationValidator,
  async (req, res, next) => {
    try {
      const registration = await update(
        req.params.id,
        req.body,
        req.user.userId,
      );

      res.status(200).json(registration);
    } catch (error) {
      next(error);
    }
  },
);

// Attendee deletes own registration
router.delete("/:id", authorize("attendee"), async (req, res, next) => {
  try {
    const registration = await remove(req.params.id, req.user.userId);

    res.status(200).json(registration);
  } catch (error) {
    next(error);
  }
});

export default router;
