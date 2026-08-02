import { Router } from "express";
import { create, index, find, update, remove } from "../services/user.js";
import { createUserValidator } from "../validators/user.js";
import { updateUserValidator } from "../validators/user.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.post("/", createUserValidator, async (req, res, next) => {
  try {
    const user = await create(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.get("/", authorize("admin"), async (req, res, next) => {
  try {
    const users = await index();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", authorize("admin"), async (req, res, next) => {
  try {
    const users = await find({ _id: req.params.id }, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});
router.patch(
  "/:id",
  authorize("admin"),
  updateUserValidator,
  async (req, res, next) => {
    try {
      const users = await update(req.params.id, req.body);
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", authorize("admin"), async (req, res, next) => {
  try {
    const users = await remove(req.params.id);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

export default router;
