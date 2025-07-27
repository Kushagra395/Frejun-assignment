import { useEffect, useState } from "react";
import { fetchComments, fetchPosts } from "../utils/api";
import useLocalStorage from "../hooks/useLocalStorage";
import React from "react";

const CommentsTable = ({ search, zoom, isEditing }) => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [localEdits, setLocalEdits] = useLocalStorage("comment_edits", {});
  const COMMENTS_PER_PAGE = 10;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const commentsData = await fetchComments();
      const postsData = await fetchPosts();

      // Create postId -> title map
      const postMap = {};
      postsData.forEach((post) => (postMap[post.id] = post.title));

      setComments(commentsData);
      setPosts(postMap);
      setLoading(false);
    };

    loadData();
  }, []);

  // Merge edits from localStorage
  const merged = comments.map((comment) => {
    const edit = localEdits[comment.id];
    return edit
      ? { ...comment, name: edit.name || comment.name, body: edit.body || comment.body }
      : comment;
  });

  // Search filtering
  const filtered = merged.filter((comment) => {
    const searchLower = search.toLowerCase();
    return (
      comment.name.toLowerCase().includes(searchLower) ||
      comment.email.toLowerCase().includes(searchLower) ||
      comment.body.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / COMMENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Edit handler for Name/Body
  const handleEdit = (id, updatedComment) => {
    setLocalEdits({
      ...localEdits,
      [id]: {
        name: updatedComment.name,
        body: updatedComment.body,
      },
    });
  };

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      {loading ? (
        <div className="text-center text-lg py-10">Loading comments...</div>
      ) : (
        <>
          {/* Zoom Wrapper */}
          <div
            className="rounded-xl shadow-lg overflow-auto bg-base-100"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
          >
            <table className="min-w-full border border-base-300">
              <thead className="bg-primary text-primary-content text-sm uppercase tracking-wide">
                <tr>
                  <th className="p-3 border border-base-300">Email</th>
                  <th className="p-3 border border-base-300">Name</th>
                  <th className="p-3 border border-base-300">Body</th>
                  <th className="p-3 border border-base-300">Post</th>
                </tr>
              </thead>
              <tbody className="text-base-content">
                {paginated.map((comment, index) => (
                  <tr
                    key={comment.id}
                    className={
                      index % 2 === 0
                        ? "bg-primary/20"
                        : "bg-primary/10"
                    }
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
                          className="input input-sm input-bordered w-full"
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
                          className="textarea textarea-bordered textarea-xs w-full"
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
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="btn btn-sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <button
              className="btn btn-sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsTable;
