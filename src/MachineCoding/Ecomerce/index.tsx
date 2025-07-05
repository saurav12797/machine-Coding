import { CartProvider } from "./cartContext";
import ProductList from "./productList";
import Cart from "./cart.jsx";

const Ecommerce = () => {
  return (
    <CartProvider>
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1> Mini E-Commerce</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default Ecommerce;
