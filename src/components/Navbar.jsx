import React from "react";

import { useState, useEffect } from "react";
import {
  FaSearchPlus,
  FaSearchMinus,
  FaDownload,
  FaEdit,
  FaSun,
  FaMoon,
  FaUndo,
} from "react-icons/fa";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "corporate",
  "synthwave",
  "dracula",
  "cyberpunk",
  "valentine",
  "aqua",
  "forest",
  "luxury",
];

const Navbar = ({
  onSearch,
  zoom,
  setZoom,
  isEditing,
  setIsEditing,
  handleDownload,
  handleReset,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");

  useEffect(() => {
    const html = document.documentElement;
    const current = html.getAttribute("data-theme") || "light";
    setSelectedTheme(current);
  }, []);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const darkThemes = [
    "dark",
    "dracula",
    "synthwave",
    "aqua",
    "forest",
    "luxury",
  ];
  const isDark = darkThemes.includes(selectedTheme);

  return (
    <div className="w-full">
      {/* frejuns Logo + Title */}
     <div className="flex items-center justify-center gap-3 mt-6 mb-4 animate-fade-in-up">
  <img
    src="./src/assets/frejun-logo.png"
    alt="Frejun Logo"
    className="w-15 h-15 animate-scale-in"
  />
  <h1 className="text-6xl font-extrabold tracking-wide animate-fade-in-up">
    <span className="text-green-500">Fre</span>
    <span className="text-base-content">jun’s Sheet</span>
 
  </h1>
</div>

      {/* Search  */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 ">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name, email or body..."
          value={searchTerm}
          onChange={handleInput}
          className="input input-bordered w-full max-w-xl bg-trimary-content "
        />

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom In */}
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 0.1, 2))}
            className="btn btn-circle bg-base-100 hover:bg-primary text-trimary-content"
            title="Zoom In"
          >
            <FaSearchPlus />
          </button>

          {/* Zoom Out */}
          <button
            onClick={() => setZoom((prev) => Math.max(prev - 0.1, 0.5))}
            className="btn btn-circle bg-base-100 hover:bg-primary text-trimary-content"
            title="Zoom Out"
          >
            <FaSearchMinus />
          </button>

          {/* Download */}
          <button
            onClick={handleDownload}
            className="btn btn-circle bg-base-100 hover:bg-primary text-trimary-content"
            title="Download CSV"
          >
            <FaDownload />
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="btn btn-circle bg-base-100 hover:bg-primary text-trimary-content"
            title="Reset Edits"
          >
            <FaUndo />
          </button>

          {/* Edit/Done Toggle */}
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="btn btn-sm bg-green-500 text-white hover:bg-green-600"
              title="Finish Editing"
            >
              ✅ Done
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-circle bg-base-100 hover:bg-primary text-trimary-content"
              title="Toggle Edit Mode"
            >
              <FaEdit />
            </button>
          )}

          {/* Theme selection */}
          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="select select-bordered select-sm"
          >
            {themes.map((theme) => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>

          {/* Theme icons */}
          <button
            className="btn btn-ghost btn-circle text-lg"
            aria-label="theme"
          >
            {isDark ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
