import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js";
import commentsRouter from "./routes/comments.js";
import verifyToken from "./middleware/verifyToken.js";
import connectDB from "./db.js";
import uploadRouter from "./routes/upload.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cookieParser from "cookie-parser";
import csrf from "csurf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const csrfProtection = csrf({ cookie: true });

dotenv.config();

const app = express();
const PORT = 3000;

await connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(csrfProtection);
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/comments", commentsRouter);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
