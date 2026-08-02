import { Router } from "express";
import { create, index, find, update, remove } from "../Services/category.js";
import {
  createCategoryValidator,
  updateCategoryValidator,
} from "../validators/category.js";
import { authorize } from "../middleware/authorize.js";

const router = Router();

router.post(
  "/",
  authorize("admin"),
  createCategoryValidator,
  async (req, res, next) => {
    try {
      const category = await create(req.body);
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.get("/", async (req, res, next) => {
  try {
    const categories = await index();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await find({ _id: req.params.id });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id",
  authorize("admin"),
  updateCategoryValidator,
  async (req, res, next) => {
    try {
      const category = await update(req.params.id, req.body);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.delete("/:id", authorize("admin"), async (req, res, next) => {
  try {
    const category = await remove(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

export default router;
