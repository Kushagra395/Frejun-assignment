import { useState } from "react";
import React from "react";

const TableRow = ({ comment, postTitle, onEdit }) => {
  const [editedName, setEditedName] = useState(comment.name);
  const [editedBody, setEditedBody] = useState(comment.body);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBody, setIsEditingBody] = useState(false);

  const handleKeyDown = (e, field) => {
    if (e.key === "Enter") {
      if (field === "name") {
        setIsEditingName(false);
        if (editedName !== comment.name) {
          onEdit(comment.id, { ...comment, name: editedName });
        }
      }
      if (field === "body") {
        setIsEditingBody(false);
        if (editedBody !== comment.body) {
          onEdit(comment.id, { ...comment, body: editedBody });
        }
      }
    }
  };

  return (
    <tr>
      <td className="p-3 border-t border-base-300 align-top">{comment.email}</td>

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
            onBlur={() => {
              setIsEditingName(false);
              if (editedName !== comment.name) {
                onEdit(comment.id, { ...comment, name: editedName });
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, "name")}
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
            onBlur={() => {
              setIsEditingBody(false);
              if (editedBody !== comment.body) {
                onEdit(comment.id, { ...comment, body: editedBody });
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, "body")}
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
