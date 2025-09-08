import { useEffect, useState } from "react";
import axios from "../axios";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

const CommentBoard = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("🐱");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNameTooLong, setIsNameTooLong] = useState(false);
  const [isContentTooLong, setIsContentTooLong] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const MAX_CONTENT_LENGTH = 500;
  const remaining = MAX_CONTENT_LENGTH - content.length;
  const MAX_NAME_LENGTH = 20;

  useEffect(() => {
    axios
      .get(`/comments/approvedComments/${postId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setComments(res.data);
        } else {
          console.warn("Unexpected response format");
        }
      })
      .catch(() => console.error("Fail to read comments"));
  }, [postId]);

  const handleNameChange = (e) => {
    if (e.target.value.length <= MAX_NAME_LENGTH) {
      setName(e.target.value);
      setIsNameTooLong(false);
    } else {
      setIsNameTooLong(true);
    }
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= MAX_CONTENT_LENGTH) {
      setContent(e.target.value);
      setIsContentTooLong(false);
    } else {
      setIsContentTooLong(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recaptchaToken) {
      alert("請完成驗證");
      return;
    }

    if (!name.trim()) {
      alert("名字要填~");
    }
    if (!content.trim()) {
      alert("留言呢~");
    }

    try {
      await axios.post("/comments", {
        name,
        avatar,
        content,
        isPublic,
        post: postId,
        recaptchaToken,
      });
      alert("留言送出~ 等待審核");
      setName("");
      setContent("");
      setIsPublic(true);
      setIsExpanded(false);
      setRecaptchaToken(null);
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
                  className="neon-filter bg-lightFooter/80 dark:bg-lightBg/80 text-lightAccent dark:text-lightText rounded-lg p-4 shadow text-sm break-words"
                >
                  <div className="flex flex-row items-center gap-4">
                    <div className="text-xl mb-1">{c.avatar}</div>
                    <p className="font-semibold">{c.name}</p>
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
            留言都會由後台審閱後再公開，也可以選擇不公開 (๑• . •๑)
          </p>
          {isExpanded && (
            <input
              value={name}
              onChange={handleNameChange}
              placeholder="你的名字 / 暱稱..."
              className="w-full border p-2 rounded neon-filter bg-darkBg/80 dark:bg-darkText text-lightAccent dark:text-lightText"
              required
            />
          )}

          <textarea
            name="comment"
            value={content}
            onChange={handleContentChange}
            onFocus={() => setIsExpanded(true)}
            placeholder="寫下你的留言..."
            className="w-full border p-2 rounded neon-filter bg-darkBg/80 dark:bg-darkText text-lightAccent dark:text-lightText"
            required
          />
          <div className="text-sm text-gray-500">
            {remaining} / {MAX_CONTENT_LENGTH}
          </div>
          {isExpanded && (
            <>
              <div className="flex flex-wrap gap-3 items-center">
                {[
                  "😊",
                  "🤩",
                  "😜",
                  "🥰",
                  "😭",
                  "🤓",
                  "😎",
                  "🐱",
                  "🐶",
                  "🦊",
                  "🐯",
                  "🦁",
                  "🦈",
                  "🐙",
                  "🪼",
                  "🐬",
                  "🐠",
                  "🐰",
                  "🐿️",
                  "🦔",
                  "🐥",
                  "🦆",
                  "🐢",
                  "🦦",
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
              <div className="scale-60">
                <ReCAPTCHA
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  theme="dark"
                />
              </div>
              {isNameTooLong && (
                <div className="text-red-600 font-semibold mb-2">
                  你的名字太長了
                </div>
              )}
              {isContentTooLong && (
                <div className="text-red-600 font-semibold mb-2">
                  你打太多字了，可以寫新的一則留言喔~
                </div>
              )}
              <button
                type="submit"
                className="bg-lightFooter/80 neon-filter dark:bg-lightBg/80 text-lightAccent dark:text-lightText px-4 py-2 rounded"
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
