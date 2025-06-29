import React, { useEffect } from "react";
import "./style.css";
import { PaginationService } from "./pagination.service";

export const Pagination = () => {
  const { getProductDetails } = PaginationService();
  
  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <div>
      <h1>Pagination</h1>
      <div className="pagination-wrapper">
        <div className="page">
          <button>1</button>
          <button>2</button>
        </div>
      </div>
    </div>
  );
};
