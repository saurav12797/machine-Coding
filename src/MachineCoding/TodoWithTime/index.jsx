import React, { useState, useEffect } from "react";
import "./styles.css";

function TodoWithTimeout() {
  const [todoItems, setTodoItems] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [timerCounter, setTimerCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleAddItem = () => {
    if (searchItem.trim()) {
      setTodoItems((prev) => [...prev, { id: Date.now(), value: searchItem }]);
      setSearchItem("");
    }
  };

  const handleSearch = (e) => setSearchItem(e.target.value);

  const handleDelete = (id) => {
    setTodoItems((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimerCounter((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleTimerCounter = (type) => {
    if (type === "start") setIsRunning(true);
    if (type === "reset") {
      setIsRunning(false);
      setTimerCounter(0);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="todo-container">
      <h2>Todo with Timer</h2>
      <div className="input-container">
        <input
          value={searchItem}
          type="text"
          className="todo-input"
          data-testid="todo-input"
          placeholder="Enter todo"
          onChange={handleSearch}
        />
        <button
          className="add-button"
          data-testid="add-button"
          onClick={handleAddItem}
        >
          Add
        </button>
      </div>
      <ul className="todo-list">
        {todoItems.map((item) => (
          <li data-testid="todo-item" className="todo-item" key={item.id}>
            <span className="todo-text">{item.value}</span>
            <div className="timer">{formatTime(timerCounter)}</div>
            <div className="button-group">
              <button
                className="timer-button start"
                onClick={() => handleTimerCounter("start")}
              >
                Start
              </button>
              <button
                className="timer-button reset"
                onClick={() => handleTimerCounter("reset")}
              >
                Reset
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoWithTimeout;
