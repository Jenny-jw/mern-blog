import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
          <Link
            to="/posts?tag=travel"
            // className="block"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            旅行
          </Link>
          <Link
            to="/posts?tag=inkTrail"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            閱讀
          </Link>
          <Link
            to="/posts?tag=life"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            生活
          </Link>
          <Link
            to="/aboutMe"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(false);
            }}
          >
            關於我
          </Link>
        </div>
      )}

      {/* <DESKTOP MENU /> */}
      <div className="hidden md:flex items-center gap-8 xl:gap12 font-medium font-sourceHanSerif">
        <Link
          to="/posts?tag=travel"
          // className="block"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
        >
          旅行
        </Link>
        <Link
          to="/posts?tag=inkTrail"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
        >
          閱讀
        </Link>
        <Link
          to="/posts?tag=life"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
        >
          生活
        </Link>
        <Link
          to="/aboutMe"
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
        >
          關於我
        </Link>
        <button
          onClick={() => setDarkMode((prev) => !prev)}
          className="text-sm px-3 py-1 rounded-md bg-white text-black dark:bg-darkText dark:text-black border border-gray-300 dark:border-white"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
