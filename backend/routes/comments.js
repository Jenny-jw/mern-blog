import express from "express";
import Comment from "../models/Comment.js";
import verifyToken from "../middleware/verifyToken.js";
import { comment } from "postcss";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, avatar, content, isPublic, post } = req.body;
    if (!name || !content || !isPublic === undefined) {
      return res.status(400).json({ error: "名稱、內容與是否公開為必填" });
    }

    const comment = new Comment({
      name,
      avatar,
      content,
      isPublic,
      post,
      approved: false,
    });

    await comment.save();
    res.status(201).json({ message: "留言成功~ 等待審核" });
  } catch (err) {
    res.status(500).json({ error: "留言失敗", detail: err.message });
  }
});

router.get("/pendingComments", verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({ approved: false }).sort({
      createdAt: -1,
    });
    console.log("PENDING COMMENTS: ", comments);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Cannot read comments" });
  }
});

router.get("/approvedComments/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({
      post: postId,
      approved: true,
    }).sort({
      createdAt: -1,
    });
    res.json(comments);
  } catch (err) {
    console.error("Fail to read comments：", err);
    res.status(500).json({ error: "Fail to read comments" });
  }
});

router.patch("/:id/approve", verifyToken, async (req, res) => {
  try {
    const comments = await Comment.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    if (!comments)
      return res.status(400).json({ error: "Cannot find this comment" });
    res.json({ message: "Comment is arrpoved", comment });
  } catch (err) {
    res.status(500).json({ error: "Comment approval failed" });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: "Cannot find comment" });
    res.json({ message: "Message has been deleted" });
  } catch (err) {
    res.status(500).json({ error: "Comment deletion failed" });
  }
});

const commentsRouter = router;
export default commentsRouter;
