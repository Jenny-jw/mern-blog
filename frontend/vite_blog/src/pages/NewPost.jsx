import { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("http://localhost:3000/api/posts", {
      title,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    });
    alert("Successfully added an article~");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto space-y-4">
      <input
        type="text"
        placeholder="TITLE"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border"
      />
      <textarea
        type="text"
        placeholder="CONTENT"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border h-60"
      />
      <input
        type="text"
        placeholder="TAGS (Seperate with ',')"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        className="w-full p-2 border"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Article
      </button>
    </form>
  );
};

export default NewPost;
