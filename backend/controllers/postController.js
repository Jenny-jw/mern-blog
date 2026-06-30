import { ServiceError } from "../errors/ServiceError.js";
import { logRouteError } from "../utils/safeLogger.js";
import * as postService from "../services/postService.js";

const ROUTE = "posts";

export const listPosts = async (req, res, next) => {
  const { tag, sort = "desc" } = req.validated.query;

  try {
    const posts = await postService.listPosts({ tag, sort });
    res.json(posts);
  } catch (err) {
    logRouteError(ROUTE, "list posts failed", err, { tag, sort });
    next(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.validated.params.id);
    res.json(post);
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    logRouteError(ROUTE, "get post failed", err, {
      postId: req.validated?.params?.id,
    });
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const savedPost = await postService.createPost(req.validated.body);
    res.json(savedPost);
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    logRouteError(ROUTE, "create post failed", err);
    next(err);
  }
};
