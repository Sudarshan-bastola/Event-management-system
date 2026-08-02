import { body } from "express-validator";
import { validate } from "./validate.js";

export const createRegistrationValidator = [
  // user removed (comes from JWT)

  body("event")
    .notEmpty()
    .withMessage("Event is required")
    .isMongoId()
    .withMessage("Invalid event id"),

  body("numberOfTickets")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Number of tickets must be at least 1"
    ),

  body("registrationStatus")
    .optional()
    .isIn([
      "Pending",
      "Confirmed",
      "Cancelled",
    ])
    .withMessage(
      "Invalid registration status"
    ),

  validate,
];

export const updateRegistrationValidator = [
  body("registrationStatus")
    .notEmpty()
    .withMessage("Registration status is required")
    .isIn([
      "Pending",
      "Confirmed",
      "Cancelled",
    ])
    .withMessage("Invalid registration status"),

  validate,
];