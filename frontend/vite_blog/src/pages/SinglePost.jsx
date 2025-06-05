import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const lastScrollTimeRef = useRef(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => setPost(res.data));
  }, [id]);

  const images = post?.images || [];
  const prevIdx = (currentIdx - 1 + images.length) % images.length;
  const nextIdx = (currentIdx + 1) % images.length;
  const handleClick = (direction) => {
    if (direction === "next") {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    } else if (direction === "prev") {
      setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTimeRef.current < 400) return;
    lastScrollTimeRef.current = now;
    if (e.deltaY > 0) handleClick("next");
    else if (e.deltaY < 0) handleClick("prev");
  };

  if (!post || images.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* LEFT: GALERY */}
      <div
        onWheel={handleWheel}
        className="md:w-1/3 h-screen sticky top-0 flex flex-col items-center justify-center gap-4 "
      >
        <img
          src={images[prevIdx]}
          alt="preview-prevImg"
          className="w-3/5 max-w-[300px] opacity-40 cursor-pointer hover:opacity-60 transition"
          onClick={() => handleClick("prev")}
        />
        {/* CURRENT IMG */}
        <img
          src={images[currentIdx]}
          alt={`img-${currentIdx}`}
          className="w-4/5 max-w-[400px] object-contain rounded shadow-lg"
        />
        {/* NEXT IMG */}
        <img
          src={images[nextIdx]}
          alt={"preview-next"}
          className="w-3/5 max-w-[300px] opacity-40 cursor-pointer hover:opacity-60 transition"
          onClick={() => handleClick("next")}
        />
      </div>
      {/* RIGHT: BLOG CONTENT */}
      <div className="md:w-2/3 prose-left prose-lg dark:prose-invert max-w-screen-md mx-auto m-8">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <h3 className="">
          {format(new Date(post.createAt), "yyyy / MM / dd")}
        </h3>
        <div
          className="m-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};

export default SinglePost;
