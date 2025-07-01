import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import verifyToken from "./middleware/verifyToken.js";
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
const PORT = 3000;

await connectDB();

app.use(
  cors({
    origin: "https://mern-blog-y294.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/auth", authRouter);
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});
console.log("App Get");
app.get("*", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "public", "index.html"));
  try {
    const filePath = path.join(__dirname, "public", "index.html");
    console.log("Serving fallback:", filePath);
    res.sendFile(filePath);
  } catch (err) {
    console.error("❌ Error serving index.html", err);
    next(err); // 傳遞給 Express 錯誤處理
  }
});
// console.log("K");
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
