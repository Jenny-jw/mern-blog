import express from "express";
import cors from "cors";
import helmet from "helmet";
import postRoutes from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import verifyToken from "./middleware/verifyToken.js";
import errorHandler from "./middleware/errorHandler.js";
import connectDB from "./db.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";
const JSON_BODY_LIMIT = process.env.JSON_BODY_LIMIT || "100kb";
const URLENCODED_BODY_LIMIT = process.env.URLENCODED_BODY_LIMIT || "100kb";
const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  "https://mern-blog-y294.onrender.com,https://takosnote.onrender.com"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

await connectDB();

if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD_HASH) {
  console.warn(
    "[auth] ADMIN_USERNAME or ADMIN_PASSWORD_HASH is missing; login will return 503"
  );
}

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        styleSrcElem: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
        ],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        fontSrc: ["'self'", "https:", "data:", "https://fonts.gstatic.com"],
        frameSrc: ["'self'", "https://www.google.com", "https://www.gstatic.com"],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        frameAncestors: ["'none'"],
        formAction: ["'self'"],
      },
    },
    frameguard: {
      action: "deny",
    },
    hsts: isProduction
      ? {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        }
      : false,
  })
);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json({ limit: JSON_BODY_LIMIT }));
app.use(
  express.urlencoded({
    extended: false,
    limit: URLENCODED_BODY_LIMIT,
    parameterLimit: 100,
  })
);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});
app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API route not found" });
});
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
