import { useState } from "react";
import Navbar from "./components/Navbar";
import CommentsTable from "./components/CommentsTable";
import React from "react";

function App() {
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(1); // Zoom level
  const [isEditing, setIsEditing] = useState(false); // Edit mode toggle
  const [localEdits, setLocalEdits] = useState(() => {
    const stored = localStorage.getItem("comment_edits");
    return stored ? JSON.parse(stored) : {};
  });

  // Handle search input
  const handleSearch = (term) => {
    setSearch(term);
  };

  // Save file as CSV
  const handleDownload = () => {
    const headers = ["Email", "Name", "Body", "Post"];
    const commentsData = Object.entries(localEdits).map(([id, data]) => ({
      id,
      ...data,
    }));

    const rows = commentsData.map((item) =>
      [item.email, item.name, item.body, item.postTitle || ""]
    );

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "frejun-sheet.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-base-200 text-base-content font-sans">
      <Navbar
        onSearch={handleSearch}
        zoom={zoom}
        setZoom={setZoom}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDownload={handleDownload}
      />

      <CommentsTable
        search={search}
        zoom={zoom}
        isEditing={isEditing}
      />
    </div>
  );
}

export default App;
