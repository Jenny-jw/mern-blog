import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
// 實際發生滾動的是 #root 元素，而不是 window
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [show, setShow] = useState(true);
  const scrollY = useRef(0);

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

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const handleScroll = () => {
      const currentY = root.scrollTop;

      if (currentY <= 50) {
        setShow(true);
      } else if (currentY > scrollY.current) {
        setShow(false); // 向下捲 -> 隱藏
      } else if (currentY < scrollY.current) {
        setShow(true); // 向上捲 -> 顯示
      }

      scrollY.current = currentY;
    };

    root.addEventListener("scroll", handleScroll);
    return () => root.removeEventListener("scroll", handleScroll);
  }, [show]);

  // backdrop-blur 加在navbar最外層
  return (
    <div
      className={`fixed top-0 navbar-full w-full h-16 md:h-20 px-8 flex items-center justify-between font-bold bg-darkBg/80 text-lightAccent dark:bg-darkText/80 dark:text-darkBg shadow-md transform transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* <LOGO /> */}
      <div className="flex justify-center items-center text-xl">
        <Link
          to={"/"}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="flex items-center gap-3"
        >
          <img
            className="w-10 h-10 object-contain"
            src="../../logo.png"
            alt=""
          />
          <span>Tako's note</span>
        </Link>
      </div>

      {/* <MOBILE: TOGGLE & MENU /> */}
      <div className="md:hidden flex items-center gap-4 text-xl">
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
        // 最外層背景遮罩 + 點擊關閉區域
        <div
          className="md:hidden fixed top-16 left-0 right-0 bottom-0 text-xl transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        >
          {/* 第二層：滑出 menu 本體 */}
          <div className="flex flex-col w-screen h-screen items-center justify-center space-y-8 bg-opacity-95 bg-lightAccent dark:bg-darkBg text-lightText dark:text-darkText transform transition-transform duration-300">
            <Link
              to="/posts?tag=travel"
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
          </div>
        </div>
      )}

      {/* <DESKTOP MENU /> */}
      <div className="hidden md:flex items-center gap-8 xl:gap12 font-medium">
        <Link
          to="/posts?tag=travel"
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
