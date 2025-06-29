import { useEffect, useState } from "react";
import "./style.css";

export default function ProgressBar() {
  const [start, setIsStart] = useState(false);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    let timerId;
    if (!start) return;

    timerId = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(timerId);
        return prev;
      });
    }, 50);

    return () => clearInterval(timerId);
  }, [start]);

  const Progress = ({ percentageValue }) => {
    return (
      <div className="progress-container">
        <div
          className="progress-bar"
          style={{
            width: `${percentage}%`,
            // transform: `translateX(${-(100 - percentage)}%)`,
          }}
        >
          <div className="percentage-value">{percentage}</div>
        </div>
      </div>
    );
  };

  const handleProgress = () => {
    setIsStart(!start);
  };

  return (
    <div>
      <h2>Progress Bar</h2>
      <button onClick={handleProgress}>{start ? "Pause" : "Start"}</button>
      <Progress percentage={percentage} />
    </div>
  );
}



// implement advance with n number s of progress bar