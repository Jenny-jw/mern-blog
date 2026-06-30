import { ServiceError } from "../errors/ServiceError.js";
import { logRouteError } from "../utils/safeLogger.js";
import * as commentService from "../services/commentService.js";

const ROUTE = "comments";

export const createComment = async (req, res, next) => {
  try {
    const result = await commentService.createComment(req.validated.body);
    res.status(201).json(result);
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    logRouteError(ROUTE, "create comment failed", err, {
      hasPost: Boolean(req.validated?.body?.post),
    });
    next(err);
  }
};

export const listPendingComments = async (_req, res, next) => {
  try {
    const comments = await commentService.listPendingComments();
    res.json(comments);
  } catch (err) {
    logRouteError(ROUTE, "read pending comments failed", err);
    next(err);
  }
};

export const listApprovedComments = async (req, res, next) => {
  try {
    const comments = await commentService.listApprovedComments(
      req.validated.params.postId
    );
    res.json(comments);
  } catch (err) {
    logRouteError(ROUTE, "read approved comments failed", err, {
      postId: req.validated?.params?.postId,
    });
    next(err);
  }
};

export const approveComment = async (req, res, next) => {
  try {
    const result = await commentService.approveComment(req.validated.params.id);
    res.json(result);
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    logRouteError(ROUTE, "approve comment failed", err, {
      commentId: req.validated?.params?.id,
    });
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const result = await commentService.deleteComment(req.validated.params.id);
    res.json(result);
  } catch (err) {
    if (err instanceof ServiceError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    logRouteError(ROUTE, "delete comment failed", err, {
      commentId: req.validated?.params?.id,
    });
    next(err);
  }
};
