import { useState } from "react";

export default function CounterTimer() {
  const [countValue, setCountValue] = useState(0);

  const handleCounter = (type) => {
    switch (type) {
      case "increment": {
        setCountValue((prev) => prev + 1);
        break;
      }
      case "reset": {
        setCountValue(0);
        break;
      }
      case "decrement": {
        if (countValue > 0) setCountValue((prev) => prev - 1);
        break;
      }
      case "default":
        return;
    }
  };

  return (
    <div>
      <h1>Counter Timer</h1>
      <h3>{countValue}</h3>
      <button onClick={() => handleCounter("decrement")}>Decrement</button>
      <button onClick={() => handleCounter("reset")}>Reset</button>
      <button onClick={() => handleCounter("increment")}>Increment</button>
    </div>
  );
}
