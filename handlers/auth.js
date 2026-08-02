import { Router } from "express";
import { register, login } from "../services/auth.js";

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const result = await register(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await login(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
