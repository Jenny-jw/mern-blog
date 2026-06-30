import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    tags: [String],
    images: [String],
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
