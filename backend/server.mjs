import connectDB from "./db.js";
import dotenv from "dotenv";
import app from "./app.mjs";

dotenv.config();

const PORT = process.env.PORT || 3000;

await connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
