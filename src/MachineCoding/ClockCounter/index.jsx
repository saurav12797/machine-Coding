import { useEffect } from "react";
import { useState } from "react";
import "./style.css";

function ClockCounter() {
  const [isRunning, setIsRunning] = useState(false);
  const [countValue, setCountValue] = useState(0);

  useEffect(() => {
    let counterId;
    if (!isRunning) return;
    counterId = setInterval(() => setCountValue((prev) => prev + 1), 1000);

    return () => clearInterval(counterId);
  }, [isRunning]);

  const handleTimeVisibility = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setCountValue(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h1>Counter</h1>
      <div>
        <h2>{countValue}</h2>
        <button onClick={handleTimeVisibility}>
          {isRunning ? "Pause" : `${countValue > 0 ? "Resume" : "Start"}`}
        </button>
        <button onClick={handleReset}>Stop</button>
        <button onClick={handleTimeVisibility}>Reset</button>
      </div>
    </div>
  );
}

export default ClockCounter;
