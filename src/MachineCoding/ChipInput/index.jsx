import { useState } from "react";
import "./style.css";

const ChipInput = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const handleOnChange = (e) => {
    const value = e.target.value.trim();
    setInput(value);
  };

  const handleEnter = (e) => {
    if (e.code === "Enter") {
      const trimmed = input.trim();
      if (trimmed) {
        setData((prev) => [
          ...prev,
          { id: Date.now().toString(), value: trimmed },
        ]);
        setInput("");
      }
    }
  };

  const handleRemoveItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div className="chip-input">
      <h1>Chip Input </h1>
      <input
        type="text"
        value={input}
        onChange={handleOnChange}
        placeholder="Type a chip and press tag"
        onKeyDown={(e) => handleEnter(e)}
      />
      <div className="chip-item">
        {data?.map((item) => (
          <p key={item?.id}>
            {item?.value}
            <span
              onClick={() => handleRemoveItem(item?.id)}
              className="remove-item"
            >
              ❌
            </span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChipInput;
