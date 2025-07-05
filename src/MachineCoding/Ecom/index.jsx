import Cart from "./cart";
import { CartProvider } from "./cartContext";
import ItemList from "./itemList";

const Ecom = () => {
  return (
    <CartProvider>
      <div className="ecom">
        <h1>Welcome to ECOM Webiste</h1>
        <ItemList />
        <Cart />
      </div>
    </CartProvider>
  );
};
export default Ecom;
