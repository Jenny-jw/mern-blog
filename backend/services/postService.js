import Post from "../models/Post.js";
import { parsePostInput } from "../utils/sanitizePost.js";
import { ServiceError } from "../errors/ServiceError.js";

export const listPosts = async ({ tag, sort = "desc" }) => {
  const tagFilter = tag ? { tags: tag } : {};
  const sortOrder = sort === "asc" ? 1 : -1;
  return Post.find(tagFilter).sort({ createAt: sortOrder });
};

export const getPostById = async (id) => {
  const post = await Post.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );

  if (!post) {
    throw new ServiceError(404, "Cannot find the article");
  }

  return post;
};

export const createPost = async (body) => {
  const parsed = parsePostInput(body);
  if (!parsed.ok) {
    throw new ServiceError(parsed.status, parsed.error);
  }

  const { title, content, tags, images } = parsed.data;
  const newPost = new Post({ title, content, tags, images });
  return newPost.save();
};
