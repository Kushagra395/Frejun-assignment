import React from "react";
import { useEffect, useState } from "react";
import { fetchComments, fetchPosts } from "../utils/api";
import useLocalStorage from "../hooks/useLocalStorage";

const CommentsTable = ({ search, zoom, isEditing }) => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [localEdits, setLocalEdits] = useLocalStorage("comment_edits", {});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const COMMENTS_PER_PAGE = 10;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const commentsData = await fetchComments();
      const postsData = await fetchPosts();

      const postMap = {};
      postsData.forEach((post) => (postMap[post.id] = post.title));

      setComments(commentsData);
      setPosts(postMap);
      setLoading(false);
    };

    loadData();
  }, []);

  const merged = comments.map((comment) => {
    const edit = localEdits[comment.id];
    return edit
      ? { ...comment, name: edit.name || comment.name, body: edit.body || comment.body }
      : comment;
  });

  const filtered = merged.filter((comment) => {
    const searchLower = search.toLowerCase();
    return (
      comment.name.toLowerCase().includes(searchLower) ||
      comment.email.toLowerCase().includes(searchLower) ||
      comment.body.toLowerCase().includes(searchLower)
    );
  });

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aVal = a[sortConfig.key].toLowerCase();
    const bVal = b[sortConfig.key].toLowerCase();

    return sortConfig.direction === "asc"
      ? aVal.localeCompare(bVal)
      : bVal.localeCompare(aVal);
  });

  const paginated = sorted.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > Math.ceil(sorted.length / COMMENTS_PER_PAGE)) return;
    setCurrentPage(page);
  };

  const handleEdit = (id, updatedComment) => {
    setLocalEdits({
      ...localEdits,
      [id]: {
        name: updatedComment.name,
        body: updatedComment.body,
      },
    });
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const totalPages = Math.ceil(sorted.length / COMMENTS_PER_PAGE);

  return (
    <div className="p-6 min-h-screen">
      {loading ? (
        <div className="text-center text-lg py-10">Loading comments...</div>
      ) : (
        <>
          <div
            className="rounded-xl shadow-lg overflow-auto bg-base-100"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <table className="min-w-full border border-base-300">
              <thead className="bg-primary text-primary-content text-sm uppercase tracking-wide">
                <tr>
                  {/* Sorting Email */}
                  <th
                    onClick={() => handleSort("email")}
                    className="p-3 border border-base-300 cursor-pointer relative group select-none"
                  >
                    Email
                    <span
                      className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs transition-opacity ${
                        sortConfig.key === "email"
                          ? "opacity-100"
                          : "group-hover:opacity-100 opacity-0"
                      }`}
                    >
                      {sortConfig.key === "email"
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "⇅"}
                    </span>
                  </th>

                  {/* Sorting Name */}
                  <th
                    onClick={() => handleSort("name")}
                    className="p-3 border border-base-300 cursor-pointer relative group select-none"
                  >
                    Name
                    <span
                      className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs transition-opacity ${
                        sortConfig.key === "name"
                          ? "opacity-100"
                          : "group-hover:opacity-100 opacity-0"
                      }`}
                    >
                      {sortConfig.key === "name"
                        ? sortConfig.direction === "asc"
                          ? "↑"
                          : "↓"
                        : "⇅"}
                    </span>
                  </th>

                  <th className="p-3 border border-base-300">Body</th>
                  <th className="p-3 border border-base-300">Post</th>
                </tr>
              </thead>
              <tbody className="text-base-content">
                {paginated.map((comment, index) => (
                  <tr
                    key={comment.id}
                    className={index % 2 === 0 ? "bg-primary/20" : "bg-primary/10"}
                  >
                    <td className="p-3 border border-base-300">{comment.email}</td>

                    {/* Editable Name */}
                    <td className="p-3 border border-base-300">
                      {isEditing ? (
                        <input
                          type="text"
                          value={comment.name}
                          onChange={(e) =>
                            handleEdit(comment.id, {
                              ...comment,
                              name: e.target.value,
                            })
                          }
                          className="w-50 h-full px-2 py-6 bg-primary/10 text-base-content  border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        comment.name
                      )}
                    </td>

                    {/* Editable Body */}
                    <td className="p-3 border border-base-300">
                      {isEditing ? (
                        <textarea
                          value={comment.body}
                          onChange={(e) =>
                            handleEdit(comment.id, {
                              ...comment,
                              body: e.target.value,
                            })
                          }
                         className="w-150 h-full px-2 py-6 bg-primary/10 text-base-content  border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        comment.body
                      )}
                    </td>

                    <td className="p-3 border border-base-300">
                      {posts[comment.postId] || "Loading..."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-sm btn-circle bg-base-200 hover:bg-base-300 disabled:opacity-50"
              title="Previous Page"
            >
              <span className="text-lg">←</span>
            </button>

            <span className="text-sm font-semibold text-base-content">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-circle bg-base-200 hover:bg-base-300 disabled:opacity-50"
              title="Next Page"
            >
              <span className="text-lg">→</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-base-content opacity-70">
  Made with ❤️ by{" "}
  <a
    href="https://kushagra-portfolio-eta.vercel.app/" //  portfolio link clikable
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold underline hover:text-primary"
  >
    Kushagra
  </a>
</div>

        </>
      )}
    </div>
  );
};

export default CommentsTable;
