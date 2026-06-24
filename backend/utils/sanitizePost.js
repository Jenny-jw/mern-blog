import sanitizeHtml from "sanitize-html";

const TITLE_MAX_LENGTH = 200;
const TAG_MAX_LENGTH = 50;
const MAX_TAGS = 20;

const PLAIN_TEXT_OPTIONS = { allowedTags: [], allowedAttributes: {} };

const CONTENT_SANITIZE_OPTIONS = {
  allowedTags: [
    "p",
    "br",
    "strong",
    "em",
    "s",
    "u",
    "h1",
    "h2",
    "h3",
    "blockquote",
    "hr",
    "ul",
    "ol",
    "li",
    "img",
    "code",
    "pre",
  ],
  allowedAttributes: {
    img: ["src", "alt"],
  },
  allowedSchemes: ["https"],
  allowedSchemesByTag: {
    img: ["https"],
  },
};

export function parsePostInput(body) {
  const title = sanitizeHtml(String(body.title ?? "").trim(), PLAIN_TEXT_OPTIONS).trim();
  if (!title) {
    return { ok: false, status: 400, error: "Title is required" };
  }
  if (title.length > TITLE_MAX_LENGTH) {
    return { ok: false, status: 400, error: "Title is too long" };
  }

  const rawContent = String(body.content ?? "").trim();
  const content = sanitizeHtml(rawContent, CONTENT_SANITIZE_OPTIONS).trim();
  const plainContent = sanitizeHtml(content, PLAIN_TEXT_OPTIONS).trim();
  if (!plainContent) {
    return { ok: false, status: 400, error: "Content is required" };
  }

  let rawTags = body.tags;
  if (rawTags == null) {
    rawTags = [];
  } else if (!Array.isArray(rawTags)) {
    return { ok: false, status: 400, error: "Invalid tags" };
  }

  if (rawTags.length > MAX_TAGS) {
    return { ok: false, status: 400, error: "Too many tags" };
  }

  const tags = rawTags
    .map((tag) =>
      sanitizeHtml(String(tag ?? "").trim(), PLAIN_TEXT_OPTIONS).trim()
    )
    .filter((tag) => tag.length > 0);

  for (const tag of tags) {
    if (tag.length > TAG_MAX_LENGTH) {
      return { ok: false, status: 400, error: "Tag is too long" };
    }
  }

  let rawImages = body.images;
  if (rawImages == null) {
    rawImages = [];
  } else if (!Array.isArray(rawImages)) {
    return { ok: false, status: 400, error: "Invalid images" };
  }

  const images = [];
  for (const item of rawImages) {
    const str = String(item ?? "").trim();
    if (!str) continue;

    let parsed;
    try {
      parsed = new URL(str);
    } catch {
      return { ok: false, status: 400, error: "Invalid image URL" };
    }

    if (parsed.protocol !== "https:") {
      return { ok: false, status: 400, error: "Invalid image URL" };
    }

    images.push(str);
  }

  return {
    ok: true,
    data: { title, content, tags, images },
  };
}
