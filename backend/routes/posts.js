import express from "express";
import Post from "../models/Post.js";
import csrf from "csurf";
import Subscriber from "../models/Subscriber.js";
import { sendEmail } from "../utils/sendEmail.js";

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
    const newPost = new Post({
      title,
      content,
      tags,
      images,
      isPublished: false,
    });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch("/:id/publish", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.isPublished) {
      return res.status(400).json({ message: "Post had been published" });
    }

    post.isPublished = true;
    await post.save();

    const subscribers = await Subscriber.find({}); // SELECT * FROM subscribers
    const emails = subscribers.map((s) => s.email);

    for (const email of emails) {
      try {
        await sendEmail({
          to: email,
          subject: ``,
          html: ``,
        });
      } catch (err) {
        console.log(`Failed to send email to ${email}`, err);
      }

      res.json({
        message: "Post had been published and subscribers are notified~",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
