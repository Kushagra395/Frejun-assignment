// utils/downloadCSV.js
export const downloadCSV = (data, posts, fileName = "comments.csv") => {
  if (!data || data.length === 0) return;

  const headers = ["Email", "Name", "Body", "Post Title"];
  
  const rows = data.map(comment => [
    `"${comment.email}"`,
    `"${comment.name}"`,
    `"${comment.body}"`,
    `"${posts[comment.postId] || ""}"`
  ]);

  const csvContent =
    headers.join(",") + "\n" + rows.map(row => row.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
