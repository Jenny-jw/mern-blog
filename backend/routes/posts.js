import express from "express";
import Post from "../models/Post.js";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import { parsePostInput } from "../utils/sanitizePost.js";
import { logRouteError } from "../utils/safeLogger.js";
import {
  createPostBodySchema,
  postIdParamSchema,
  postsListQuerySchema,
} from "../validation/schemas.js";
import csrf from "csurf";

const router = express.Router();
const csrfProtection = csrf({ cookie: true });
const ROUTE = "posts";

router.get("/", validateRequest({ query: postsListQuerySchema }), async (req, res, next) => {
  const { tag, sort = "desc" } = req.validated.query;
  try {
    const tagFilter = tag ? { tags: tag } : {};
    const sortOrder = sort === "asc" ? 1 : -1;
    const posts = await Post.find(tagFilter).sort({ createAt: sortOrder });
    res.json(posts);
  } catch (err) {
    logRouteError(ROUTE, "list posts failed", err, { tag, sort });
    next(err);
  }
});

router.get("/:id", validateRequest({ params: postIdParamSchema }), async (req, res, next) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.validated.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!post)
      return res.status(404).json({ error: "Cannot find the article" });
    res.json(post);
  } catch (err) {
    logRouteError(ROUTE, "get post failed", err, {
      postId: req.validated?.params?.id,
    });
    next(err);
  }
});

router.post(
  "/",
  verifyToken,
  csrfProtection,
  validateRequest({ body: createPostBodySchema }),
  async (req, res, next) => {
  try {
    const parsed = parsePostInput(req.validated.body);
    if (!parsed.ok) {
      return res.status(parsed.status).json({ error: parsed.error });
    }

    const { title, content, tags, images } = parsed.data;
    const newPost = new Post({ title, content, tags, images });
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    logRouteError(ROUTE, "create post failed", err);
    next(err);
  }
});

export default router;
