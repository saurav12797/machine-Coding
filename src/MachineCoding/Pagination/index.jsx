import { useEffect, useState } from "react";
import { getProducts } from "./pagination.service";
import ProductCard from "./productCard";

const Pagination = () => {
  const [productData, setProductData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getProducts({ limit: 200 });
    setProductData(data.products || []);
  };

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(productData.length / PAGE_SIZE);
  const start = (currentPage - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const handlePageChange = (index) => setCurrentPage(index + 1);
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div>
      <h1>Pagination</h1>

      <span className="arrow" onClick={handlePrevPage}>
        ◀
      </span>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={index + 1 === currentPage ? "active" : ""}
          onClick={() => handlePageChange(index)}
        >
          {index + 1}
        </button>
      ))}

      <span className="arrow" onClick={handleNextPage}>
        ►
      </span>

      {productData.length > 0 ? (
        <ProductCard productData={productData.slice(start, end)} />
      ) : (
        "No Products Found"
      )}
    </div>
  );
};

export default Pagination;
