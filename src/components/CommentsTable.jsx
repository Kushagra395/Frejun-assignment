import React from "react";
import { useEffect, useState } from "react";
import { fetchComments, fetchPosts } from "../utils/api";
import TableRow from "./TableRow";

const CommentsTable = ({ search }) => {
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const COMMENTS_PER_PAGE = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const commentsData = await fetchComments();
      const postsData = await fetchPosts();

      // Convert posts into map: { postId: title }
      const postMap = {};
      postsData.forEach((post) => (postMap[post.id] = post.title));

      setComments(commentsData);
      setPosts(postMap);
      setLoading(false);
    };

    loadData();
  }, []);

  // Apply search
  const filtered = comments.filter((comment) => {
    const searchLower = search.toLowerCase();
    return (
      comment.name.toLowerCase().includes(searchLower) ||
      comment.email.toLowerCase().includes(searchLower) ||
      comment.body.toLowerCase().includes(searchLower)
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / COMMENTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * COMMENTS_PER_PAGE,
    currentPage * COMMENTS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-4 overflow-x-auto">
      {loading ? (
        <div className="text-center text-lg py-10">Loading comments...</div>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-base font-semibold">
                <th>Email</th>
                <th>Name</th>
                <th>Body</th>
                <th>Post</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((comment) => (
                <TableRow
                  key={comment.id}
                  comment={comment}
                  postTitle={posts[comment.postId]}
                />
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-4">
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
