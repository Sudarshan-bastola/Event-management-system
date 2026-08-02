import { body } from "express-validator";
import { validate } from "./validate.js";

export const createEventValidator = [
  body("title")
    .notEmpty()
    .withMessage("Event title is required")
    .isLength({ min: 3 })
    .withMessage("Event title must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .trim()
    .escape(),

  // organizer removed because it comes from JWT

  body("eventDate")
    .notEmpty()
    .withMessage("Event date is required")
    .isISO8601()
    .withMessage("Invalid event date"),

  body("startTime")
    .notEmpty()
    .withMessage("Start time is required"),

  body("endTime")
    .notEmpty()
    .withMessage("End time is required"),

  body("ticketPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Ticket price cannot be negative"),

  body("totalSeats")
    .notEmpty()
    .withMessage("Total seats are required")
    .isInt({ min: 1 })
    .withMessage("Total seats must be at least 1"),

  body("availableSeats")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available seats cannot be negative")
    .custom((value, { req }) => {
      if (value > req.body.totalSeats) {
        throw new Error(
          "Available seats cannot exceed total seats"
        );
      }

      return true;
    }),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id"),

  body("venue")
    .optional()
    .isMongoId()
    .withMessage("Invalid venue id"),

  body("image")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn([
      "Upcoming",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid event status"),

  validate,
];

export const updateEventValidator = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Event title must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .trim()
    .escape(),

  body("eventDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid event date"),

  body("startTime").optional(),

  body("endTime").optional(),

  body("ticketPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Ticket price cannot be negative"),

  body("totalSeats")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Total seats must be at least 1"),

  body("availableSeats")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Available seats cannot be negative"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Invalid category id"),

  body("venue")
    .optional()
    .isMongoId()
    .withMessage("Invalid venue id"),

  body("image")
    .optional()
    .trim(),

  body("status")
    .optional()
    .isIn([
      "Upcoming",
      "Completed",
      "Cancelled",
    ])
    .withMessage("Invalid event status"),

  validate,
];