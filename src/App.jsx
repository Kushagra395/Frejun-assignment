import React from "react";
import { useState } from "react";
import Navbar from "./components/Navbar";
import CommentsTable from "./components/CommentsTable";

function App() {
  const [search, setSearch] = useState("");

  return (
   <div className="min-h-screen bg-base-100 text-base-content font-sans">
  <Navbar onSearch={setSearch} />
  <CommentsTable search={search} />
</div>
  );
}

export default App;
