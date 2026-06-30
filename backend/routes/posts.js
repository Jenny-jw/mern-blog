import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import validateRequest from "../middleware/validateRequest.js";
import { doubleCsrfProtection } from "../middleware/csrfProtection.js";
import * as postController from "../controllers/postController.js";
import {
  createPostBodySchema,
  postIdParamSchema,
  postsListQuerySchema,
} from "../validation/schemas.js";

const router = express.Router();

router.get(
  "/",
  validateRequest({ query: postsListQuerySchema }),
  postController.listPosts
);

router.get(
  "/:id",
  validateRequest({ params: postIdParamSchema }),
  postController.getPost
);

router.post(
  "/",
  verifyToken,
  doubleCsrfProtection,
  validateRequest({ body: createPostBodySchema }),
  postController.createPost
);

export default router;
