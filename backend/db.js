import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/blog");
    console.log("🔌 Trying to connect to MongoDB...");
    console.log("✅ MongoDB connected");
    console.log("🧾 BD name:", mongoose.connection.name);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
