import express from "express";
import Comment from "../models/Comment.js";
import verifyToken from "../middleware/verifyToken.js";
import { comment } from "postcss";
import sanitizeHtml from "sanitize-html";
import rateLimit from "express-rate-limit";
import csrf from "csurf";
import axios from "axios";
import validateRequest from "../middleware/validateRequest.js";
import {
  commentIdParamSchema,
  createCommentBodySchema,
  postIdForCommentsParamSchema,
} from "../validation/schemas.js";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
const logRouteError = (scope, err, extra = {}) => {
  const safeDetails = {
    name: err?.name,
    code: err?.code,
    message: err?.message,
    status: err?.response?.status,
    ...extra,
  };
  console.error(`[comments] ${scope}`, safeDetails);
};

const commentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    error: "休息一下~ 你留太多言了",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post(
  "/",
  commentLimiter,
  validateRequest({ body: createCommentBodySchema }),
  async (req, res, next) => {
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
      const params = new URLSearchParams();
      params.append("secret", process.env.RECAPTCHA_SECRET_KEY);
      params.append("response", recaptchaToken);

      const googleRes = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        params.toString(),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      if (!googleRes.data.success) {
        return res.status(403).json({ error: "驗證失敗" });
      }
    } catch (err) {
      logRouteError("recaptcha verify failed", err);
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
    logRouteError("create comment failed", err, { hasPost: Boolean(req.body?.post) });
    next(err);
  }
});

router.get("/pendingComments", verifyToken, async (req, res, next) => {
  try {
    const comments = await Comment.find({ approved: false }).sort({
      createdAt: -1,
    });

    res.json(comments);
  } catch (err) {
    logRouteError("read pending comments failed", err);
    next(err);
  }
});

router.get(
  "/approvedComments/:postId",
  validateRequest({ params: postIdForCommentsParamSchema }),
  async (req, res, next) => {
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
    logRouteError("read approved comments failed", err, { postId: req.params?.postId });
    next(err);
  }
});

router.patch(
  "/:id/approve",
  verifyToken,
  csrfProtection,
  validateRequest({ params: commentIdParamSchema }),
  async (req, res, next) => {
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
    logRouteError("approve comment failed", err, { commentId: req.params?.id });
    next(err);
  }
});

router.delete(
  "/:id",
  verifyToken,
  csrfProtection,
  validateRequest({ params: commentIdParamSchema }),
  async (req, res, next) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: "Cannot find comment" });
    res.json({ message: "Message has been deleted" });
  } catch (err) {
    logRouteError("delete comment failed", err, { commentId: req.params?.id });
    next(err);
  }
});

const commentsRouter = router;
export default commentsRouter;
