import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import csrf from "csurf";
import verifyToken from "../middleware/verifyToken.js";

dotenv.config();

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const ADMIN_USERNAME = "takoSan";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
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

// router.get("/me", (req, res) => {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).json({ message: "Not logged in" });

//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ username: user.username });
//   } catch {
//     return res.status(403).json({ message: "Invalid token" });
//   }
// });

router.get("/me", verifyToken, (req, res) => {
  res.json({ username: req.user.username });
});

router.get("/csrf-token", csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const authRouter = router;
export default authRouter;
