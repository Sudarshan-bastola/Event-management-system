import bcrypt from "bcrypt";
import User from "../models/user.js";
import { generateAccessToken } from "../config/jwt.js";
import { ValidationError } from "../errors/validation.js";

export const register = async (data) => {
  const existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    throw new ValidationError("Email already exists");
  }

  const user = await User.create(data);

  return {
    accessToken: generateAccessToken({
      userId: user._id,
      role: user.role,
    }),
  };
};

export const login = async (data) => {
  const user = await User.findOne({ email: data.email });

  if (!user) {
    throw new ValidationError("Invalid email or password");
  }

  const matched = await bcrypt.compare(data.password, user.password);

  if (!matched) {
    throw new ValidationError("Invalid email or password");
  }

  return {
    accessToken: generateAccessToken({
      userId: user._id,
      role: user.role,
    }),
  };
};
