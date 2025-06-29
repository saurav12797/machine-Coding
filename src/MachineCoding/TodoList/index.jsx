import React, { useState } from "react";

function TodoList() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const handleAddItem = () => {
    if (!input.trim()) return;
    setItems((prev) => [
      ...prev,
      { id: Date.now(), value: input.trim(), isChecked: false },
    ]);
    setInput("");
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleCheck = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
      
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter Todo"
      />
      <button onClick={handleAddItem}>Add</button>

      <ul>
        {items.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            <input
              type="checkbox"
              checked={item.isChecked}
              onChange={() => handleToggleCheck(item.id)}
            />
            <span
              style={{
                marginLeft: "10px",
                textDecoration: item.isChecked ? "line-through" : "none",
              }}
            >
              {item.value}
            </span>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
