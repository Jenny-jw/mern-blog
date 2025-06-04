import express from "express";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import uploadRouter from "./routes/upload.js";
import connectDB from "./db.js";

const app = express();
const PORT = 3000;

await connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/upload", uploadRouter);
app.use("/uploads", express.static("public/uploads"));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
