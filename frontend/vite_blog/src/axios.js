import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-blog-10r3.onrender.com/api",
  withCredentials: true,
});

export default instance;
