import { useCart } from "./cartContext";
import "./style.css";

const ItemList = () => {
  const { cart, setCart } = useCart();
  const initialData = [
    { name: "TV", price: 200000 },
    { name: "AC", price: 400000 },
    { name: "Mobile", price: 34000 },
    { name: "Speaker", price: 6788 },
  ];
  const handleAddToCart = (activeCart) => {
    const isItemExists = cart?.some((item) => item.name === activeCart.name);
    if (isItemExists) {
      setCart((prev) =>
        prev?.map((item) => {
          if (item.name === activeCart.name) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      );
    } else setCart((prev) => [...prev, { ...activeCart, quantity: 1 }]);
  };

  return (
    <div className="cart">
      {initialData?.map((item, index) => (
        <div key={index} className="cart-item">
          <p>{item?.name} </p>
          <p>{item?.price} </p>
          <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};
export default ItemList;
