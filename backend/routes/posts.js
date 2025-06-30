import express from "express";
import Post from "../models/Post.js";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

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
    if (!post)
      return res.status(404).json({ error: "Cannot find the article" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error." });
  }
});

router.post("/", csrfProtection, async (req, res) => {
  try {
    const { title, content, tags, images } = req.body;
    const newPost = new Post({ title, content, tags, images });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
