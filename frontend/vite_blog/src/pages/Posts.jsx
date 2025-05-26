import { useEffect, useState } from "react";

const mockPosts = [
  { id: 1, title: "十三區 - 六個月的家", tags: ["life"] },
  { id: 2, title: "很吵的小孩？", tags: ["education"] },
  { id: 3, title: "貓咪舌頭", tags: ["cooking"] },
];

const Posts = () => {
  const [tag, setTag] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const filteredPosts = tag
      ? mockPosts.filter((post) => post.tags.includes(tag))
      : mockPosts;
    setPosts(filteredPosts);
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
