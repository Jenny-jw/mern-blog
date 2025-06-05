import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  tags: [String],
  createAt: {
    type: Date,
    default: Date.now,
  },
  images: [String],
});

export default mongoose.model("Post", postSchema);
