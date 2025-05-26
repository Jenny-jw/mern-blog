import axios from "axios";
import { useEffect, useState } from "react";

const Posts = () => {
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/api/posts", {
        params: tag ? { tag } : {},
      });
      console.log(res);
      setPosts(res.data);
    };
    fetchPosts();
  }, [tag]);

  return (
    <div>
      <h1 className="text-2xl font-bold">文章列表</h1>
      <div className="flex gap-2">
        {["all", "education", "life", "cooking"].map((t) => (
          <button
            key={t}
            className={`px-3 py-1 rounded-full ${
              tag === t || (t === "all" && tag === "")
                ? "bg-lightFooter text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setTag(t === "all" ? "" : t)}
          >
            #{t}
          </button>
        ))}
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <h2 className="text-xl">{post.title}</h2>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Posts;
