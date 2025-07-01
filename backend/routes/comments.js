import express from "express";
import Comment from "../models/Comment.js";
import verifyToken from "../middleware/verifyToken.js";
import { comment } from "postcss";
import sanitizeHtml from "sanitize-html";
import rateLimit from "express-rate-limit";
import csrf from "csurf";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "休息一下~ 你留太多言了",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post("/", commentLimiter, async (req, res) => {
  try {
    const rawName = String(req.body.name || "").trim();
    const rawContent = String(req.body.content || "").trim();
    const name = sanitizeHtml(rawName, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    const content = sanitizeHtml(rawContent, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    const { avatar, isPublic, post, recaptchaToken } = req.body;

    if (!recaptchaToken) {
      return res.status(400).json({ error: "缺少驗證碼" });
    }

    if (!name || !content || typeof isPublic === "undefined") {
      return res.status(400).json({ error: "名稱、內容與是否公開為必填" });
    }

    try {
      const secret = process.env.RECAPTCHA_SECRET_KEY;
      const googleRes = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        null,
        {
          params: {
            secret,
            response: recaptchaToken,
          },
        }
      );

      if (!googleRes.data.success) {
        return res.status(403).json({ error: "驗證失敗" });
      }
    } catch (err) {
      return res.status(500).json({ error: "驗證服務錯誤" });
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
    console.error("Fail to read comments needed to be approved：", err);
    res
      .status(500)
      .json({ error: "Fail to read comments needed to be approved" });
  }
});

router.patch("/:id/approve", verifyToken, csrfProtection, async (req, res) => {
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

router.delete("/:id", verifyToken, csrfProtection, async (req, res) => {
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
