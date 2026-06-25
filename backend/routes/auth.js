import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import { loginBodySchema } from "../validation/schemas.js";

dotenv.config();

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
const TOKEN_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  path: "/",
};

const getAdminCredentials = () => {
  const username = process.env.ADMIN_USERNAME;
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!username || !passwordHash) {
    return null;
  }

  return { username, passwordHash };
};

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,
  message: {
    error: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/login", loginLimiter, validateRequest({ body: loginBodySchema }), async (req, res) => {
  const admin = getAdminCredentials();
  if (!admin) {
    return res.status(503).json({ message: "Login unavailable" });
  }

  const { username, password } = req.body;

  if (username !== admin.username) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    ...TOKEN_COOKIE_OPTIONS,
    maxAge: 3600000,
  });

  return res.json({ message: "Login successful" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", TOKEN_COOKIE_OPTIONS);
  res.json({ message: "Logged out" });
});

router.get("/test", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/me", verifyToken, (req, res) => {
  res.json({ username: req.user.username });
});

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const authRouter = router;
export default authRouter;
