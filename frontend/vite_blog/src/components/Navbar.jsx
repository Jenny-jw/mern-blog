import { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="navbar-full w-full h-16 md:h-20 px-8 flex items-center justify-between font-bold relative bg-darkBg text-lightAccent dark:bg-darkText dark:text-darkBg">
      {/* <LOGO /> */}
      <div className="flex items-center gap-4 text-xl">
        {/* <img className="" src="" alt="" /> */}
        <span>Tako's note</span>
      </div>

      {/* <MOBILE: TOGGLE & MENU /> */}
      <div className="md:hidden flex items-center gap-4 text-2xl">
        {/* LIGHT or DARK MODE */}
        <button
          className="text-sm px-3 py-1 rounded-md bg-white text-black dark:bg-darkText dark:text-black border border-gray-300 dark:border-white"
          onClick={() => setDarkMode((prev) => !prev)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        {/* MENU BUTTON */}
        <div
          className="cursor-pointer"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? "X" : "☰"}
        </div>
      </div>

      {/* TODO: (1) Animation */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 w-screen h-screen top-16 flex flex-col space-y-6 text-lg items-center justify-center bg-lightAccent text-lightText dark:bg-darkBg dark:text-darkText font-sourceHanSerif"
          onClick={() => setIsMenuOpen(false)}
        >
          <p onClick={(e) => e.stopPropagation()}>交換、旅行</p>
          <p onClick={(e) => e.stopPropagation()}>閱讀、Podcast</p>
          <p onClick={(e) => e.stopPropagation()}>關於生活</p>
          <p onClick={(e) => e.stopPropagation()}>聯繫我</p>
        </div>
      )}

      {/* <DESKTOP MENU /> */}
      <div className="hidden md:flex items-center gap-8 xl:gap12 font-medium font-sourceHanSerif">
        <p className="cursor-pointer">交換、旅行</p>
        <p className="cursor-pointer">閱讀、Podcast</p>
        <p className="cursor-pointer">關於生活</p>
        <p className="cursor-pointer">聯繫我</p>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="ml-4 text-sm px-3 py-1 rounded-md bg-white text-black dark:bg-darkText dark:text-black border border-gray-300 dark:border-white"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
