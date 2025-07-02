import { useState } from "react";
import "./style.css";

const InfiniteScrolling = () => {
  const [data] = useState([...Array(10).keys()]);

  const handleScroll = (e) => {
    const topHeight = e.target.scrollTop;
    console.log(topHeight);
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      <h1>Infinite Scroll</h1>
      {data.map((item, index) => (
        <div className="scrolling-wrapper" key={index}>
          <p>{item}</p>
        </div>
      ))}
    </div>
  );
};

export default InfiniteScrolling;
