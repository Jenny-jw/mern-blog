import { useState } from "react";
import axios from "axios";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [imageList, setImageList] = useState([]);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      Heading,
      Blockquote,
      HorizontalRule,
    ],
    content: "<p>Start writing a new article 🤩</p>",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "http://localhost:3000/api/posts",
        {
          title,
          content: editor?.getHTML(),
          tags: tags.split(",").map((tag) => tag.trim()),
          images: imageList,
        },
        {
          withCredentials: true,
        }
      );
      alert("Successfully added an article~ 😉");
    } catch (err) {
      alert("Post article failed 😓");
      console.log(err);
    }
  };

  const addImage = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.click();

    fileInput.onchange = async () => {
      const file = fileInput.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("image", file);

      try {
        const res = await axios.post(
          "http://localhost:3000/api/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        const imageUrl = res.data.url;
        editor?.chain().focus().setImage({ src: imageUrl }).run();
      } catch (err) {
        alert("Image upload failed 😓");
        console.log(err);
      }
    };
  };

  const uploadToGallery = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.click();

    fileInput.onchange = async () => {
      const files = Array.from(fileInput.files);
      const newImageUrls = [];

      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const res = await axios.post(
            "http://localhost:3000/api/upload",
            formData
          );
          newImageUrls.push(res.data.url);
        } catch (err) {
          console.error("Gallery image upload failed", err);
        }
      }

      setImageList((prev) => [...prev, ...newImageUrls]);
    };
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-8 p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Galery 🖼️</label>
          <div className="flex gap-2 overflow-x-auto mb-2">
            {imageList.map((url, idx) => {
              return (
                <img
                  key={idx}
                  src={url}
                  className="w-24 h-24 object-over rounded"
                />
              );
            })}
          </div>
          <button type="button" className="btn" onClick={uploadToGallery}>
            Upload images to gallery 🤩
          </button>
        </div>
        <input
          type="text"
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {editor && (
          <div className="flex flex-wrap gap-2 mb-2 text-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              type="button"
              className="btn"
            >
              Bold
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              type="button"
              className="btn"
            >
              Italic
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              type="button"
              className="btn"
            >
              Underline
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              type="button"
              className="btn"
            >
              Strike
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              type="button"
              className="btn"
            >
              H1
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              type="button"
              className="btn"
            >
              H2
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              type="button"
              className="btn"
            >
              H3
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              type="button"
              className="btn"
            >
              Quote
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              type="button"
              className="btn"
            >
              HR
            </button>
            <button
              onClick={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
              type="button"
              className="btn"
            >
              Clear
            </button>
            <button onClick={addImage} type="button" className="btn">
              Image
            </button>
          </div>
        )}
        <div className="border rounded p-2">
          <EditorContent editor={editor} className="min-h-[200px] text-left" />
        </div>
        <input
          type="text"
          placeholder="TAGS (Seperate with ',')"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Article
        </button>
      </form>
      <hr />
      {/* PREVIEW SECTION */}
      <div>
        <h2 className="text-xl font-bold mb-2">Preview:</h2>
        <div
          className="prose prose-sm md:prose-base max-w-none prose-left"
          dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }}
        />
      </div>
    </div>
  );
};

export default NewPost;
