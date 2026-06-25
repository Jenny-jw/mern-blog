import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;
const objectIdSchema = z.string().regex(objectIdRegex, "Invalid id format");

export const loginBodySchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(1).max(200),
});

export const postsListQuerySchema = z.object({
  tag: z.string().trim().min(1).max(50).optional(),
  sort: z.enum(["asc", "desc"]).optional(),
});

export const postIdParamSchema = z.object({
  id: objectIdSchema,
});

export const createPostBodySchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  tags: z.array(z.unknown()).optional(),
  images: z.array(z.unknown()).optional(),
});

export const createCommentBodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  content: z.string().trim().min(1).max(2000),
  avatar: z.string().max(16).optional(),
  isPublic: z.boolean(),
  post: objectIdSchema,
  recaptchaToken: z.string().trim().min(1).max(4096),
});

export const postIdForCommentsParamSchema = z.object({
  postId: objectIdSchema,
});

export const commentIdParamSchema = z.object({
  id: objectIdSchema,
});
