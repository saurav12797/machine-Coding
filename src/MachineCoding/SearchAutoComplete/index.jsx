import { useEffect, useRef, useState } from "react";
import "./style.css";

const AutoComplete = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const cache = useRef({});
  const controller = useRef(null);

  const handleOnChange = (e) => {
    setSearchText(e?.target?.value);
  };

  const handleSearchData = async () => {
    if (cache.current?.[searchText]) {
      setData(cache.current[searchText]);
      return;
    }

    controller.current?.abort();
    controller.current = new AbortController();

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchText}`,
        { signal: controller.current.signal }
      );

      const data = await response.json();
      setData(data?.products);
      cache.current[searchText] = data?.products;
    } catch (e) {}
  };

  useEffect(() => {
    if (!searchText) return;

    const timer = setTimeout(handleSearchData, 1000);

    return () => {
      clearTimeout(timer);
      controller.current?.abort();
    };
  }, [searchText]);

  return (
    <div>
      <div className="search-wrapper">
        <input type="text" value={searchText} onChange={handleOnChange} />
        {data?.length > 0 && searchText && (
          <div className="suggestion-box">
            {data?.map((item) => (
              <p key={item?.id}>{item?.title}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoComplete;
