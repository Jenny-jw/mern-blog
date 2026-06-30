import express from "express";
import rateLimit from "express-rate-limit";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import { doubleCsrfProtection } from "../middleware/csrfProtection.js";
import * as commentController from "../controllers/commentController.js";
import {
  commentIdParamSchema,
  createCommentBodySchema,
  postIdForCommentsParamSchema,
} from "../validation/schemas.js";

const router = express.Router();

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
  commentController.createComment
);

router.get("/pendingComments", verifyToken, commentController.listPendingComments);

router.get(
  "/approvedComments/:postId",
  validateRequest({ params: postIdForCommentsParamSchema }),
  commentController.listApprovedComments
);

router.patch(
  "/:id/approve",
  verifyToken,
  doubleCsrfProtection,
  validateRequest({ params: commentIdParamSchema }),
  commentController.approveComment
);

router.delete(
  "/:id",
  verifyToken,
  doubleCsrfProtection,
  validateRequest({ params: commentIdParamSchema }),
  commentController.deleteComment
);

export default router;
