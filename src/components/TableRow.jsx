import React from "react";
import { useState } from "react";

const TableRow = ({ comment, postTitle }) => {
  const [editedName, setEditedName] = useState(comment.name);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);

  const handleKey = (e, field) => {
    if (e.key === "Enter") {
      if (field === "name") setIsEditingName(false);
      if (field === "body") setIsEditingBody(false);
    }
  };

  return (
    <tr>
      <td>{comment.email}</td>

      {/* Editable Name */}
      <td
        onClick={() => setIsEditingName(true)}
        className="cursor-pointer max-w-xs"
      >
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            onBlur={() => setIsEditingName(false)}
            onKeyDown={(e) => handleKey(e, "name")}
            className="input input-sm input-bordered w-full"
            autoFocus
          />
        ) : (
          <span className="hover:underline">{editedName}</span>
        )}
      </td>

      {/* Editable Body */}
      <td
        onClick={() => setIsEditingBody(true)}
        className="cursor-pointer max-w-md"
      >
        {isEditingBody ? (
          <textarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
            onBlur={() => setIsEditingBody(false)}
            onKeyDown={(e) => handleKey(e, "body")}
            className="textarea textarea-bordered w-full"
            autoFocus
          />
        ) : (
          <span className="hover:underline">{editedBody}</span>
        )}
      </td>

      <td>{postTitle || "Loading..."}</td>
    </tr>
  );
};

export default TableRow;
