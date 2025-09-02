import { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleSave = () => {
    if (newText.trim() !== "") {
      onEdit(todo.id, newText);
      setIsEditing(false);
    }
  };

  return (
    <li className={`todo-item ${todo.done ? "done" : ""}`}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleSave}>💾</button>
          <button onClick={() => setIsEditing(false)}>❌</button>
        </>
      ) : (
        <>
          <span onClick={() => onToggle(todo.id)}>{todo.text}</span>
          <button onClick={() => setIsEditing(true)}>✏️</button>
          <button onClick={() => onDelete(todo.id)}>❌</button>
        </>
      )}
    </li>
  );
}
