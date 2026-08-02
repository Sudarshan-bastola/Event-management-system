import { body } from "express-validator";
import { validate } from "./validate.js";

export const createVenueValidator = [
    body("name")
        .notEmpty()
        .withMessage("Venue name is required")
        .trim()
        .escape(),

    body("address")
        .notEmpty()
        .withMessage("Address is required")
        .trim()
        .escape(),

    body("city")
        .notEmpty()
        .withMessage("City is required")
        .trim()
        .escape(),

    body("capacity")
        .notEmpty()
        .withMessage("Capacity is required")
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),

    validate,
];

export const updateVenueValidator = [
    body("name")
        .optional()
        .trim()
        .escape(),

    body("address")
        .optional()
        .trim()
        .escape(),

    body("city")
        .optional()
        .trim()
        .escape(),

    body("capacity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Capacity must be at least 1"),

    validate,
];