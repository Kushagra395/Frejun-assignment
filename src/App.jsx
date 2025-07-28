import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CommentsTable from "./components/CommentsTable";
import { fetchComments, fetchPosts } from "./utils/api";
import { downloadCSV } from "./utils/downloadCSV";
import React from "react";

function App() {
  const [search, setSearch] = useState("");
  const [zoom, setZoom] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [localEdits, setLocalEdits] = useState(() => {
    const stored = localStorage.getItem("comment_edits");
    return stored ? JSON.parse(stored) : {};
  });

  // Fetch comments and posts on load
  useEffect(() => {
    const loadData = async () => {
      const commentsData = await fetchComments();
      const postsData = await fetchPosts();

      const postMap = {};
      postsData.forEach((post) => {
        postMap[post.id] = post.title;
      });

      setComments(commentsData);
      setPosts(postMap);
    };

    loadData();
  }, []);

  const handleSearch = (term) => {
    setSearch(term);
  };

  const handleReset = () => {
    localStorage.removeItem("comment_edits");
    window.location.reload();
  };

  const handleDownload = () => {
    // Merge edits
    const merged = comments.map((comment) => {
      const edit = localEdits[comment.id];
      return edit
        ? {
            ...comment,
            name: edit.name || comment.name,
            body: edit.body || comment.body,
          }
        : comment;
    });

    // Use reusable utility from utils
    downloadCSV(merged, posts, "frejun-sheet.csv");
  };

  return (
    <div className="min-h-screen text-base-content font-sans">
      <Navbar
        onSearch={handleSearch}
        zoom={zoom}
        setZoom={setZoom}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDownload={handleDownload}
        handleReset={handleReset}
      />

      <CommentsTable
        search={search}
        zoom={zoom}
        isEditing={isEditing}
        comments={comments}
        posts={posts}
        localEdits={localEdits}
        setLocalEdits={setLocalEdits}
      />
    </div>
  );
}

export default App;
