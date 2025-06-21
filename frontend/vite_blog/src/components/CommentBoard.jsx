import { useState } from "react";

const initialComments = [
  {
    id: 1,
    content: "這篇文章好棒！",
    author: "小明",
    avatar: "🐱",
    isPublic: true,
  },
  {
    id: 2,
    content: "我也覺得，太有共鳴了！",
    author: "小美",
    avatar: "🦊",
    isPublic: true,
  },
];

let nextId = 3;

const CommentBoard = () => {
  const [comments, setComments] = useState(initialComments);
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [avatar, setAvatar] = useState("🐱");
  const [isPublic, setIsPublic] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !content) return;
    setComments((prev) => [
      ...prev,
      {
        id: nextId++,
        author,
        content,
        avatar,
        isPublic,
      },
    ]);
    setAuthor("");
    setContent("");
    setIsPublic(true);
    setIsExpanded(false);
  };
  console.log("isExpanded =", isExpanded);
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-6 p-6">
        {/* BOARD */}
        <div className="md:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 order-2 md:order-1">
          {comments
            .filter((c) => c.isPublic)
            .map((c) => (
              <div
                key={c.id}
                className="bg-yellow-100 rounded-lg p-4 shadow text-sm break-words"
              >
                <div className="flex flex-row gap-4">
                  <div className="text-xl mb-1">{c.avatar}</div>
                  <p className="font-semibold">{c.author}</p>
                </div>

                <p>{c.content}</p>
              </div>
            ))}
        </div>
        {/* EDIT SECTION */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/3 space-y-4 order-1 md:order-2"
        >
          <h2 className="text-lg font-bold">留個言吧 ✏️</h2>
          {isExpanded && (
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              className="w-full border p-2 rounded"
            />
          )}
          <textarea
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => {
              console.log("Focus detected");
              setIsExpanded(true);
            }}
            placeholder="Write your comment..."
            className="w-full border p-2 rounded"
          />
          {isExpanded && (
            <>
              <div className="flex gap-2 items-center">
                {["🐱", "🐶", "🦊", "🐼", "🦄"].map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`text-2xl ${
                      avatar === a ? "ring-2 ring-blue-400 rounded-full" : ""
                    }`}
                    onClick={() => setAvatar(a)}
                  >
                    {a}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
                Make this public
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Commit
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default CommentBoard;
