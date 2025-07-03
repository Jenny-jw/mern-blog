import { useState } from "react";
import axios from "../axios";

const SubscribeForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("/subscribe", { email });
      setMessage("訂閱成功，email見 😉");
      setEmail("");
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage("你已經訂閱過了~");
      } else {
        setMessage("訂閱失敗，請稍後再試");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-row max-w-sm mx-auto">
      <input
        type="email"
        placeholder="輸入你的 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border p-2 w-full rounded"
      ></input>
      <button
        type="submit"
        className="bg-lightFooter/80 dark:bg-lightBg/80 text-lightAccent dark:text-lightText px-4 py-2 rounded"
      >
        訂閱
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default SubscribeForm;
