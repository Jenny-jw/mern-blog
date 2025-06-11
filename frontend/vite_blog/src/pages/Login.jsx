import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });
      const { token } = res.data;
      auth.setToken(token);
      navigate("/new");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      auth.setError(msg);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          className="block w-full border p-2 mb-3"
          type="text"
          placeholder="USERNAME"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="block w-full border p-2 mb-3"
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 w-full"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
