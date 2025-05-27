import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// const posts = [
//   { id: 1, title: "十三區 - 六個月的家", tags: ["life"] },
//   { id: 2, title: "很吵的小孩？", tags: ["travel"] },
//   { id: 3, title: "沼澤女孩", tags: ["inkTrail"] },
// ];

router.get("/", async (req, res) => {
  const { tag } = req.query;
  try {
    const posts = tag ? await Post.find({ tags: tag }) : await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Article doesn't exist." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const newPost = new Post({ title, content, tags });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
