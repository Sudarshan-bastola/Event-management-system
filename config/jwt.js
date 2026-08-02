import jwt from "jsonwebtoken";

export const generateAccessToken = (
  data,
  expiresIn = process.env.JWT_EXPIRES_IN,
) => {
  return jwt.sign(data, process.env.JWT_SECRET_KEY, {
    expiresIn,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
