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
    // TAGS BAR
    <div className="m-8">
      <div className="flex gap-4 m-4">
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
      {/* POSTS LISTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!posts || posts.length === 0 ? (
          <p className="pt-10">敬請期待 (๑´ㅂ`๑)</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="group bg-lightFooter/80 dark:bg-lightBg/80 flex flex-col items-center shadow-md rounded p-4 m-4 transition duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="w-full max-w-[300px] aspect-[4/3]  overflow-hidden rounded shadow-lg">
                <img
                  src={post.images[0]}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <Link
                to={`/posts/${post._id}`}
                className="mt-2 text-xl text-lightAccent dark:text-lightText text-center group-hover:text-lightText"
              >
                {post.title}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;
