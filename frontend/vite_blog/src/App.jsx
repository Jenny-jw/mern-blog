// Main component of the app
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Posts from "./pages/Posts.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SinglePost from "./pages/SinglePost.jsx";
import NewPost from "./pages/NewPost.jsx";
import "./App.css";
import AboutMe from "./pages/AboutMe.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/Login.jsx";
import ReviewComments from "./pages/ReviewComments.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const theme = localStorage.getItem("theme");
    return theme === "dark"; // false: may be light or neon; true: dark mode
  });
  const [neon, setNeon] = useState(() => {
    const isNeon = localStorage.getItem("neon");
    if (isNeon != null) return isNeon === "true";
    return false;
  });
  const [preNeonMode, setPreNeonMode] = useState(darkMode);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("dark", "neon", "light");

    if (neon) {
      root.classList.add("neon");
      setPreNeonMode(darkMode);
    } else {
      root.classList.remove("neon");
      root.classList.add(darkMode ? "dark" : "light");
    }

    localStorage.setItem("theme", darkMode ? "dark" : "light");
    localStorage.setItem("neon", neon ? "true" : "false");
  }, [darkMode, neon]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        neon
          ? "bg-gradient-to-tl from-[var(--blue)] to-[var(--pink)] text-[var(--white)]"
          : "bg-lightAccent text-lightText dark:bg-darkBg dark:text-darkText"
      }`}
    >
      {/* <div className="min-h-screen flex flex-col bg-lightAccent text-lightText dark:bg-darkBg dark:text-darkText bg-gradient-to-tl from-[var(--blue)] to-[var(--pink)] text-[var(--text)]"> */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        neon={neon}
        setNeon={setNeon}
        preNeonMode={preNeonMode}
        setPreNeonMode={setPreNeonMode}
      />
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pendingComments"
            element={
              <ProtectedRoute>
                <ReviewComments />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
