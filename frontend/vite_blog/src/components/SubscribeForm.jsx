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
    <form
      onSubmit={handleSubmit}
      className="flex flex-row gap-4 w-full items-center"
    >
      <input
        type="email"
        placeholder="輸入你的 Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-grow px-4 py-2 rounded bg-lightAccent dark:bg-lightText text-darkBg/80 dark:text-darkText"
      ></input>
      <button
        type="submit"
        className="px-4 py-2 rounded bg-lightFooter/80 dark:bg-greyButton text-lightAccent dark:text-darkText"
      >
        訂閱
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
};

export default SubscribeForm;
