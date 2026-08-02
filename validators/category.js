import { body } from "express-validator";
import { validate } from "./validate.js";

export const createCategoryValidator = [
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .trim()
    .escape(),

  validate,
];

export const updateCategoryValidator = [
  body("name")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Category name must be at least 3 characters long")
    .trim()
    .escape(),

  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long")
    .trim()
    .escape(),

  validate,
];
