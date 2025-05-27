import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/posts/${id}`)
      .then((res) => setPost(res.data));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="prose dark:prose-invert max-w-screen-md mx-auto">
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
};

export default SinglePost;
