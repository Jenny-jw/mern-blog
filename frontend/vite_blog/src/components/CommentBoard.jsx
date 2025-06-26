import { useEffect, useState } from "react";
import axios from "axios";

const CommentBoard = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🐱");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/comments/approvedComments/${postId}`)
      .then((res) => setComments(res.data))
      .catch(() => alert("Fail to read comments"));
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("名字要填~");
    }
    if (!content.trim()) {
      alert("留言呢~");
    }

    try {
      await axios.post("/api/comments", {
        name,
        avatar,
        content,
        isPublic,
        post: postId,
      });
      alert("留言送出~ 等待審核");
      setName("");
      setContent("");
      setIsPublic(true);
      setIsExpanded(false);
    } catch (err) {
      alert("留言失敗 😥");
      console.log(err);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-6 p-6">
        {/* BOARD */}
        <div className="md:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 order-2 md:order-1">
          {comments.length > 0 ? (
            comments
              .filter((c) => c.isPublic)
              .map((c) => (
                <div
                  key={c.id}
                  className="bg-lightFooter/80 dark:bg-lightBg/80 text-lightAccent dark:text-lightText rounded-lg p-4 shadow text-sm break-words"
                >
                  <div className="flex flex-row items-center gap-4">
                    <div className="text-xl mb-1">{c.avatar}</div>
                    <p className="font-semibold">{c.author}</p>
                  </div>
                  <p className="text-left">{c.content}</p>
                </div>
              ))
          ) : (
            <p className="text-gray-500">當第一個留言的人吧 (๑´ㅁ`)</p>
          )}
        </div>
        {/* EDIT SECTION */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/3 space-y-4 order-1 md:order-2"
        >
          <h2 className="text-lg font-bold">留個言吧 ✏️</h2>
          <p className="font-light text-sm">
            留言都會再後台審閱後公開，也可以選擇不公開 (๑• . •๑)
          </p>
          {isExpanded && (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border p-2 rounded"
            />
          )}

          <textarea
            name="comment"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="寫下你的留言..."
            className="w-full border p-2 rounded"
          />
          {isExpanded && (
            <>
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  "😊",
                  "🤩",
                  "😜",
                  "🥰",
                  "😭",
                  "😥",
                  "🤓",
                  "🐱",
                  "🐶",
                  "🦊",
                  "🦈",
                  "👻",
                ].map((a) => (
                  <button
                    key={a}
                    type="button"
                    className={`text-2xl ${
                      avatar === a
                        ? "ring-2 ring-lightFooter/80 dark:ring-lightBg/80 rounded-xl"
                        : ""
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
                  className="accent-lightFooter dark:accent-lightBg"
                />
                跟大家分享這個留言
              </label>
              <button
                type="submit"
                className="bg-lightFooter/80 dark:bg-lightBg/80 text-lightAccent dark:text-lightText px-4 py-2 rounded"
              >
                送出留言
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default CommentBoard;
