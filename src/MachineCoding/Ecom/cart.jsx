import { useCart } from "./cartContext";
import "./style.css";

const Cart = () => {
  const { cart, setCart } = useCart();

  const handleDeleteFromCart = (selectedCart) => {
    setCart((prev) => prev?.filter((item) => item.name !== selectedCart.name));
  };

  return (
    <div>
      This is cart
      {cart?.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item.name} </p>
          <p> {item.quantity}</p>

          <button onClick={() => handleDeleteFromCart(item)}>
            Delete from Cart
          </button>
          <div className="quantity">
            <span>Quantity</span>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Cart;
