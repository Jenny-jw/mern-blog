import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import csrf from "csurf";
import rateLimit from "express-rate-limit";
import verifyToken from "../middleware/verifyToken.js";

dotenv.config();

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const getAdminCredentials = () => {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return null;
  }

  return { username, password };
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

router.post("/login", loginLimiter, (req, res) => {
  const admin = getAdminCredentials();
  if (!admin) {
    return res.status(503).json({ message: "Login unavailable" });
  }

  const { username, password } = req.body;

  if (username === admin.username && password === admin.password) {
    const token = jwt.sign({ username: admin.username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 3600000,
    });

    return res.json({ message: "Login successful" });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

router.get("/test", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.get("/me", verifyToken, (req, res) => {
  console.log("Cookies:", req.cookies);
  res.json({ username: req.user.username });
});

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const authRouter = router;
export default authRouter;
