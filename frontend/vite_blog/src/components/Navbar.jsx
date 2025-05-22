import { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full h-16 md:h-20 px-8 flex items-center justify-between font-bold bg-white relative">
      {/* <LOGO /> */}
      <div className="flex items-center gap-4 text-xl">
        {/* <img className="" src="" alt="" /> */}
        <span>Tako's note</span>
      </div>

      {/* <MOBILE MENU /> */}
      <div
        className="md:hidden text-2xl cursor-pointer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? "X" : "☰"}
      </div>

      {/* TODO: (1) 'X' disappear, (2) Animation */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 w-screen h-screen top-16 flex flex-col items-center justify-center bg-red-500"
          onClick={() => setIsMenuOpen(false)}
        >
          <p onClick={(e) => e.stopPropagation()}>Home</p>
          <p onClick={(e) => e.stopPropagation()}>Blog</p>
          <p onClick={(e) => e.stopPropagation()}>About</p>
        </div>
      )}

      {/* <DESKTOP MENU /> */}
      <div className="hidden md:flex items-center gap-8 xl:gap12 font-medium">
        <p className="cursor-pointer">Home</p>
        <p className="cursor-pointer">Blog</p>
        <p className="cursor-pointer">About</p>
      </div>
    </div>
  );
};

export default Navbar;
