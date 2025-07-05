import { useCart } from "./cartContext";

const ProductList = () => {
  const { state, dispatch } = useCart();
  const { products, filter } = state;

  const filteredProducts =
    filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <h2>Products</h2>
      <select
        value={filter}
        onChange={(e) =>
          dispatch({ type: "SET_FILTER", payload: e.target.value })
        }
      >
        <option>All</option>
        <option>Electronics</option>
        <option>Clothing</option>
      </select>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            style={{ border: "1px solid #ccc", padding: "1rem" }}
          >
            <h4>{prod.name}</h4>
            <p>${prod.price}</p>
            <p>{prod.category}</p>
            <button
              onClick={() => dispatch({ type: "ADD_TO_CART", payload: prod })}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
