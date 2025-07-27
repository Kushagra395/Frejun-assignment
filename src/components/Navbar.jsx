
import React from "react";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

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

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("light");

  const handleInput = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setSelectedTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <div className="bg-base-200 w-full px-6 py-4 shadow-md sticky top-0 z-50">
      {/* Main title */}
    <div className="flex items-center gap-3 justify-center mb-4">
  <img src="/src/assets/frejun-logo.png" alt="Frejun Logo" className="w-10 h-10" />
  <h1 className="text-4xl font-extrabold tracking-wide text-primary">
    Frejun’s Sheet
  </h1>
</div>

      {/* Controls: Search + Theme */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by name, email or body..."
          value={searchTerm}
          onChange={handleInput}
          className="input input-bordered w-full max-w-xl"
        />

        {/* Theme selector + toggle icon */}
        <div className="flex items-center gap-3">
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

          <div className="btn btn-ghost btn-circle text-lg" aria-label="theme icon">
            {selectedTheme === "light" ? <FaSun /> : <FaMoon />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
