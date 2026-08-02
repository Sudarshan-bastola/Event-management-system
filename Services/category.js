import Category from "../models/category.js";
import { NotFoundError } from "../errors/not-found.js";

export const create = async (data) => {
  const category = await Category.create(data);
  return category;
};

export const index = async () => {
  const categories = await Category.find({});
  return categories;
};

export const find = async (param, config) => {
  const category = await Category.findOne(param, config);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

export const update = async (id, data) => {
  const category = await Category.findByIdAndUpdate(id, data, {
    returnDocument: "after",
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};

export const remove = async (id) => {
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category;
};
