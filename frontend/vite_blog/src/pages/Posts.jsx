import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Posts = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tag = searchParams.get("tag") || "";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/api/posts", {
        params: tag ? { tag } : {},
      });
      setPosts(res.data);
    };
    fetchPosts();
  }, [tag]);

  const handleTagClick = (tag) => {
    const urlTag = tag === "all" ? "" : tag;
    navigate(`/posts${urlTag ? `?tag=${urlTag}` : ""}`);
  };

  return (
    <div className="m-8">
      <h1 className="text-2xl font-bold">文章列表</h1>
      <div className="flex gap-2">
        {["all", "travel", "inkTrail", "life"].map((t) => {
          const urlTag = t === "all" ? "" : t;
          return (
            <button
              key={t}
              onClick={() => handleTagClick(t)}
              className={`px-3 py-1 rounded-full ${
                tag === urlTag
                  ? "bg-lightFooter text-white dark:bg-darkButton dark:text-darkBg"
                  : "bg-gray-200 dark:text-darkBg"
              }`}
            >
              #{t}
            </button>
          );
        })}
      </div>
      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post._id} className="border-b pb-2">
            <Link
              to={`/posts/${post._id}`}
              className="text-xl text-lightFooter dark:text-darkText hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
