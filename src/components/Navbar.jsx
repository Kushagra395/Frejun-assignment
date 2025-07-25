import React from "react";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value); 
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    const html = document.querySelector("html");
    if (html.getAttribute("data-theme") === "light") {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 shadow-md sticky top-0 bg-base-100 z-50">
      <h1 className="text-2xl font-bold">📋 Comment Sheet</h1>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search comments..."
          value={searchTerm}
          onChange={handleInput}
          className="input input-bordered w-60"
        />
        <button onClick={toggleTheme} className="btn btn-ghost text-xl">
          <FaSun className="block dark:hidden" />
          <FaMoon className="hidden dark:block" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
