import { useState } from "react";

export default function TodoInput({ onAdd, setError }) {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
    setError(""); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    setText(""); 
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input">
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Enter a task..."
      />
      <button type="submit">Add</button>
    </form>
  );
}
