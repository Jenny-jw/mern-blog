import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import authRouter from "./routes/auth.js";
import verifyToken from "./middleware/verifyToken.js";
import connectDB from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

await connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRouter);
app.use("/uploads", express.static("public/uploads"));
app.use("/api", authRouter);
app.use("/api/protected", verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protexted.` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
