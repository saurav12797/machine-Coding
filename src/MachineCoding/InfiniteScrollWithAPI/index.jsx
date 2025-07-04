import { useState, useEffect } from "react";
import "./style.css";

const InfiniteScrolling = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const THRESHOLD = 100;

  const loadMoreData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const params = new URLSearchParams({ _page: page }).toString();
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${params}`
      );

      const newData = await response.json();

      if (newData.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...newData]);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    const remainingHeight = scrollHeight - (scrollTop + clientHeight);
    if (remainingHeight < THRESHOLD) {
      loadMoreData();
    }
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="scroll-container" onScroll={handleScroll}>
      <h1>Infinite Scroll</h1>
      {data.map((item) => (
        <div className="scrolling-wrapper" key={item.id}>
          <p>{item.title}</p>
        </div>
      ))}
      {loading && <div className="loading">Loading....</div>}
      {!hasMore && <div className="loading">No more data</div>}
    </div>
  );
};

export default InfiniteScrolling;
