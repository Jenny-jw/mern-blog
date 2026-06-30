import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ServiceError } from "../errors/ServiceError.js";

export const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};

export const getAdminCredentials = () => {
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!username || !passwordHash) {
    return null;
  }

  return { username, passwordHash };
};

export const login = async ({ username, password }) => {
  const admin = getAdminCredentials();
  if (!admin) {
    throw new ServiceError(503, "Login unavailable");
  }

  if (username !== admin.username) {
    throw new ServiceError(401, "Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatch) {
    throw new ServiceError(401, "Invalid credentials");
  }

  const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, username: admin.username };
};
