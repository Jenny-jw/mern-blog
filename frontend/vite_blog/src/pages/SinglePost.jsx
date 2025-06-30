import { useParams } from "react-router-dom";
import axios from "../axios";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import CommentBoard from "../components/CommentBoard";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const lastScrollTimeRef = useRef(0);
  const galleryRef = useRef(null);

  useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => setPost(res.data));
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

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTimeRef.current < 200) return;
      lastScrollTimeRef.current = now;

      if (e.deltaY > 10) handleClick("next");
      else if (e.deltaY < 10) handleClick("prev");
    };

    gallery.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      gallery.removeEventListener("wheel", handleWheel);
    };
  }, [images.length]);

  if (!post || images.length === 0) return <div>Loading...</div>;

  return (
    // reletive 放在最外層?!
    <div className="">
      <div className="flex flex-col md:flex-row gap-4">
        {/* LEFT: GALERY */}
        {/* <div className="overflow-hidden w-full md:w-1/3"> */}
        <div
          ref={galleryRef}
          className="w-full md:w-1/3 h-[25vh] md:h-screen md:sticky md:top-0 flex flex-row md:flex-col items-center md:justify-center gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 py-4 md:px-0 scrollbar-hide touch-auto"
        >
          {/* PREV IMG */}
          <img
            src={images[prevIdx]}
            alt="preview-prevImg"
            className="w-1/4 md:w-3/5 max-w-[300px] opacity-40 cursor-pointer hover:opacity-60 transition snap-start flex-shrink-0 object-contain"
            onClick={() => handleClick("prev")}
          />
          {/* CURRENT IMG */}
          <img
            src={images[currentIdx]}
            alt={`img-${currentIdx}`}
            className="w-1/2 md:w-4/5 max-w-[400px] rounded shadow-lg snap-center flex-shrink-0 object-contain"
          />
          {/* NEXT IMG */}
          <img
            src={images[nextIdx]}
            alt={"preview-next"}
            className="w-1/4 md:w-3/5 max-w-[300px] opacity-40 cursor-pointer hover:opacity-60 transition snap-end flex-shrink-0 object-contain"
            onClick={() => handleClick("next")}
          />
          {/* </div> */}
        </div>
        {/* RIGHT: BLOG CONTENT */}
        <div className="md:w-2/3 prose-left prose-lg dark:prose-invert max-w-screen-md mx-auto m-8 pt-4 md:pt-20">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <h2 className="text-base">
            {format(new Date(post.createAt), "yyyy / MM / dd")}
          </h2>
          <div
            className="m-8"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      <CommentBoard postId={post._id} />
    </div>
  );
};

export default SinglePost;
