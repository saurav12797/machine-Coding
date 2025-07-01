import { useState, useEffect } from "react";
import "./style.css";

const SearchAutoComplete = () => {
  const [products, setProducts] = useState([{}]);
  const [input, setInput] = useState("");
  const [cache, setCache] = useState({});
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(handleFetchData, 400);
    return () => clearTimeout(timer);
  }, [input]);

  const handleFetchData = async () => {
    if (cache[input]) {
      setProducts(cache[input]);
      return;
    }
    console.log("new API call");
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${input}`,
    );
    const data = await response.json();
    setProducts(data.products || []);

    setCache((prev) => ({ ...prev, [input]: data.products }));
  };
  const handleSearch = async (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      setShowSearch(true);
      return;
    }
    setShowSearch(false);
  };

  return (
    <div>
      <h1>Search Autocomplete</h1>
      <div className="search-wrapper">
        <input
          className="searchbar"
          value={input}
          onChange={handleSearch}
          type="text"
          onBlur={() => setShowSearch(false)}
          onFocus={() => setShowSearch(true)}
        />
        {products.length > 1 && showSearch && (
          <div className="search-suggestion">
            {products?.map((item) => {
              return (
                <p
                  className="search-items"
                  onClick={() => handleCurrentItem(item)}
                  key={item.id}
                >
                  {item?.title}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAutoComplete;
