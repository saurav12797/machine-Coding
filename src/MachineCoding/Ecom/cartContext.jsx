import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const CartContext = createContext(null);
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
