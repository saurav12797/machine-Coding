import React from "react";
import { useCart } from "./cartContext";

const FilterPanel = () => {
  const { dispatch } = useCart();

  return (
    <div>
      <h3>Filters</h3>
      <label>
        Category:
        <select
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              payload: { category: e.target.value },
            })
          }
        >
          <option>All</option>
          <option>Electronics</option>
          <option>Apparel</option>
          <option>Books</option>
        </select>
      </label>
      <br />
      <label>
        Price:
        <select
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              payload: { priceRange: e.target.value },
            })
          }
        >
          <option>All</option>
          <option>Low</option>
          <option>Mid</option>
          <option>High</option>
        </select>
      </label>
    </div>
  );
};

export default FilterPanel;
