import { useEffect, useState } from "react";
import axios from "axios";
import { auth } from "../utils/auth";

const ReviewComments = () => {
  const [comments, setComments] = useState([]);
  const token = auth.getToken();

  useEffect(() => {
    if (!token) {
      alert("Please log in first.");
      return;
    }

    axios
      .get("/api/comments/pendingComments", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("API 回傳內容：", res.data);
        setComments(res.data);
      })
      .catch(() => alert("Cannot fetch comments or you don't have access"));
  }, [token]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `/api/comments/${id}/approve`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(comments.filter((c) => c._id !== id));
    } catch {
      alert("Fail to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(comments.filter((c) => c._id !== id));
    } catch {
      alert("Fail to delete comment");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Comments to be approved</h2>
      {Array.isArray(comments) ? (
        comments.length === 0 ? (
          <p>目前沒有待審留言</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="flex flex-row border p-4 mb-2 gap-8"
            >
              <p>{comment.avatar}</p>
              <p>{comment.name}</p>
              <p className="mb-2">{comment.content}</p>
              <button
                onClick={() => handleApprove(comment._id)}
                className="bg-green-500 text-white px-3 py-1 mr-2"
              >
                通過
              </button>
              <button
                onClick={() => handleReject(comment._id)}
                className="bg-red-500 text-white px-3 py-1"
              >
                拒絕
              </button>
            </div>
          ))
        )
      ) : (
        <p>留言資料格式錯誤</p> // ✅ 防呆 fallback
      )}
    </div>
  );
};

export default ReviewComments;
