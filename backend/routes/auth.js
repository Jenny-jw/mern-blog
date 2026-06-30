import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import * as authController from "../controllers/authController.js";
import { loginBodySchema } from "../validation/schemas.js";

dotenv.config();

const router = express.Router();

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

router.post(
  "/login",
  loginLimiter,
  validateRequest({ body: loginBodySchema }),
  authController.login
);

router.post("/logout", authController.logout);
router.get("/test", verifyToken, authController.test);
router.get("/me", verifyToken, authController.me);
router.get("/csrf-token", authController.csrfToken);

export default router;
