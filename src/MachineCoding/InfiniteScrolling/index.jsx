import { useState } from "react";
import "./style.css";

const InfiniteScrolling = () => {
  const [data, setData] = useState([...Array(10)]);
  const [loading, setLoading] = useState(false);
  const THRESHOLD = 100;

  const loadMoreData = () => {
    setLoading(true);
    setTimeout(() => {
      setData((prev) => [...prev, ...Array(10)]);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight < THRESHOLD && !loading) {
      loadMoreData();
    }
  };

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      <h1>Infinite Scroll</h1>
      {data?.map((item, index) => (
        <div className="scrolling-wrapper" key={index}>
          <p>{item}</p>
        </div>
      ))}
      {loading && <div>Loading....</div>}
    </div>
  );
};

export default InfiniteScrolling;
