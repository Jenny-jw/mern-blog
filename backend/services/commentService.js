import axios from "axios";
import sanitizeHtml from "sanitize-html";
import Comment from "../models/Comment.js";
import { ServiceError } from "../errors/ServiceError.js";

const sanitizePlainText = (value) =>
  sanitizeHtml(String(value || "").trim(), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();

export const verifyRecaptcha = async (recaptchaToken) => {
  if (!recaptchaToken) {
    throw new ServiceError(400, "缺少驗證碼");
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
      throw new ServiceError(403, "驗證失敗");
    }
  } catch (err) {
    if (err instanceof ServiceError) {
      throw err;
    }
    throw new ServiceError(500, "驗證服務錯誤");
  }
};

export const createComment = async ({
  name: rawName,
  content: rawContent,
  avatar,
  isPublic,
  post,
  recaptchaToken,
}) => {
  const name = sanitizePlainText(rawName);
  const content = sanitizePlainText(rawContent);

  await verifyRecaptcha(recaptchaToken);

  if (!name || !content || typeof isPublic === "undefined") {
    throw new ServiceError(400, "名稱、內容與是否公開為必填");
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
  return { message: "留言成功~ 等待審核" };
};

export const listPendingComments = async () =>
  Comment.find({ approved: false }).sort({ createdAt: -1 });

export const listApprovedComments = async (postId) =>
  Comment.find({ post: postId, approved: true }).sort({ createdAt: -1 });

export const approveComment = async (id) => {
  const comment = await Comment.findByIdAndUpdate(
    id,
    { approved: true },
    { new: true }
  );

  if (!comment) {
    throw new ServiceError(400, "Cannot find this comment");
  }

  return { message: "Comment is arrpoved", comment };
};

export const deleteComment = async (id) => {
  const comment = await Comment.findByIdAndDelete(id);

  if (!comment) {
    throw new ServiceError(404, "Cannot find comment");
  }

  return { message: "Message has been deleted" };
};
