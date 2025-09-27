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
  views: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Post", postSchema);
