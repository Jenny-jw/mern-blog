import axios from "axios";

const BASE_URL = "/api/auth";

export const auth = {
  login: async (username, password) => {
    const res = await axios.post(
      `${BASE_URL}/login`,
      { username, password },
      { withCredentials: true }
    );
    return res.data;
  },
  logout: async () => {
    await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
  },
  getCurrentUser: async () => {
    const res = await axios.get(`${BASE_URL}/me`, { withCredentials: true });
    return res.data;
  },
};
