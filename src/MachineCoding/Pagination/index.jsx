import React, { useEffect, useState } from "react";
import "./style.css";
import { getProductDetails } from "./pagination.service";

export const Pagination = () => {
  const [products, setProducts] = useState([{}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayProducts, setDisplayProducts] = useState([{}]);
  const [totalBtn, setTotalBtn] = useState([]);
  const MAX_PAGE_SIZE = 10;

  const startIndex = (currentPage - 1) * MAX_PAGE_SIZE;
  const endIndex = currentPage * MAX_PAGE_SIZE;

  const updateTotalBtn = () => {
    const total = Math.ceil((products.length - 1) / MAX_PAGE_SIZE);

    setTotalBtn(Array(total).fill(""));
  };

  useEffect(() => {
    getProductDetails({ limit: 200 }).then((data) => {
      setProducts(data);
      handleCurrentDisplayProduct();
      updateTotalBtn();
    });
  }, []);

  const handleCurrentDisplayProduct = () => {
    if (!products.length) return;

    const newProducts = products.slice(startIndex, endIndex).map((item) => {
      return item;
    });
    setDisplayProducts(newProducts);
  };
  console.log(displayProducts);

  const handlePageChange = (index) => setCurrentPage(index + 1);

  return (
    <div>
      <h1>Pagination</h1>
      <div className="pagination-wrapper">
        {displayProducts?.map((item) => {
          return <div>{item.title}</div>;
        })}
        {totalBtn?.map((_, index) => {
          return (
            <button onClick={() => handlePageChange(index)}>{index + 1}</button>
          );
        })}
      </div>
    </div>
  );
};
