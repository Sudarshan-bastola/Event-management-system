import { body } from "express-validator";
import { validate } from "./validate.js";

export const createReviewValidator = [

    // user removed (comes from JWT)

    body("event")
        .notEmpty()
        .withMessage("Event is required")
        .isMongoId()
        .withMessage("Invalid event id"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .optional()
        .trim()
        .escape(),

    validate,
];

export const updateReviewValidator = [

    body("rating")
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .optional()
        .trim()
        .escape(),

    validate,
];