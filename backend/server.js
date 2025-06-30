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
// import csrf from "csurf";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const csrfProtection = csrf({ cookie: true });

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
// app.options(
//   "*",
//   cors({
//     origin: "https://mern-blog-y294.onrender.com",
//     credentials: true,
//   })
// );
console.log("C");
app.use(cookieParser());
app.use(express.json());
// app.use(csrfProtection);
console.log("D");
app.use("/api/posts", postRoutes);
console.log("E");
app.use("/api/upload", uploadRouter);
console.log("F");
app.use("/api/comments", commentsRouter);
console.log("G");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
console.log("H");
app.use("/api/auth", authRouter);
console.log("I");
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});
console.log("J");
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
