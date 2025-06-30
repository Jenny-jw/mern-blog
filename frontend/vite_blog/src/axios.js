import axios from "axios";

const instance = axios.create({
  baseURL: "https://mernblog-backend-dmdb.onrender.com/api",
  withCredentials: true,
});

export default instance;
