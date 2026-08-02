import { body } from "express-validator";
import { validate } from "./validate.js";

const paymentMethods = ["Cash", "eSewa", "Khalti", "Card"];
const paymentStatuses = ["Pending", "Paid", "Failed"];

export const createPaymentValidator = [
    body("registration")
        .notEmpty()
        .withMessage("Registration is required")
        .isMongoId()
        .withMessage("Registration must be a valid ID"),

    body("amount")
        .notEmpty()
        .withMessage("Amount is required")
        .isFloat({ min: 0 })
        .withMessage("Amount cannot be negative"),

    body("paymentMethod")
        .notEmpty()
        .withMessage("Payment method is required")
        .isIn(paymentMethods)
        .withMessage(
            `Payment method must be one of: ${paymentMethods.join(", ")}`
        ),

    body("paymentStatus")
        .optional()
        .isIn(paymentStatuses)
        .withMessage(
            `Payment status must be one of: ${paymentStatuses.join(", ")}`
        ),

    body("transactionId")
        .if(body("paymentMethod").isIn(["eSewa", "Khalti", "Card"]))
        .notEmpty()
        .withMessage(
            "Transaction ID is required for eSewa, Khalti, and Card payments"
        )
        .trim()
        .escape(),

    body("transactionId")
        .if(body("paymentMethod").equals("Cash"))
        .optional()
        .trim()
        .escape(),

    validate,
];
export const updatePaymentValidator = [
    body("paymentStatus")
        .notEmpty()
        .withMessage("Payment status is required")
        .isIn(["Pending", "Paid", "Failed"])
        .withMessage("Invalid payment status"),

    validate,
];