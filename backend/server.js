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
console.log("A");

app.use(
  cors({
    origin: "https://mern-blog-y294.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  })
);
console.log("B");
app.use(cookieParser());
app.use(express.json());
console.log("C");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
console.log("D");
app.use(express.static(path.join(__dirname, "public")));
console.log("E");
app.use("/api/posts", postRoutes);
console.log("F");
app.use("/api/upload", uploadRouter);
console.log("G");
app.use("/api/comments", commentsRouter);
console.log("H");
app.use("/api/auth", authRouter);
console.log("I");
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});
console.log("J");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// console.log("K");
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
