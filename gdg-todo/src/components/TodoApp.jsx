import { useState, useEffect, useId } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

export default function TodoApp() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("all");
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [error, setError] = useState(""); 
  const uniqueId = useId();

  const addTodo = (text) => {
    if (!text.trim()) {
      setError("Task cannot be empty!");
      return;
    }
    if (todos.some((t) => t.text.toLowerCase() === text.trim().toLowerCase())) {
      setError("Task already exists!");
      return;
    }
    setTodos([{ id: uniqueId + "-" + Math.random(), text, done: false }, ...todos]);
    setError("");
  };

  const toggleTodo = (id) => {
    if (!todos.find((t) => t.id === id)) {
      console.warn("Tried toggling a non-existent todo.");
      return;
    }
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      )
    );
  };

  const deleteTodo = (id) => {
    if (!todos.find((t) => t.id === id)) {
      console.warn("Tried deleting a non-existent todo.");
      return;
    }
    setTodos(todos.filter((t) => t.id !== id));
  };

  const editTodo = (id, newText) => {
    if (!newText.trim()) {
      setError("Task cannot be empty!");
      return;
    }
    if (todos.some((t) => t.text.toLowerCase() === newText.trim().toLowerCase() && t.id !== id)) {
      setError("Task already exists!");
      return;
    }
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
    setError("");
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredTodos = todos.filter((t) => {
    if (filter === "completed") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  const emptyMessage = {
    all: "No tasks yet. Are you that free? :D",
    completed: "Nothing completed yet!",
    pending: "Looks like someone was being productive ;)",
  };

  return (
    <div className="todo-app">
      <div className="header">
        <h1>Todo App</h1>
        <button
          className="theme-toggle"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>

      {error && <p className="todo-error">{error}</p>}

      <TodoInput onAdd={addTodo} setError={setError} />

      <div className="todo-filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "active" : ""}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active" : ""}
        >
          Pending
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <p className="todo-empty">{emptyMessage[filter]}</p>
      ) : (
        <TodoList 
          todos={filteredTodos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
          onEdit={editTodo} 
        />
      )}
    </div>
  );
}
