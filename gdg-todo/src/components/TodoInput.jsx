import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    if (task.trim()) {
      onAdd(task);
      setTask("");
    }
  };

  return (
    <div className="todo-input">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
