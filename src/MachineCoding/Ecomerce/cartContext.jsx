import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  products: [
    { id: 1, name: "iPhone", price: 999, category: "Electronics" },
    { id: 2, name: "MacBook", price: 1999, category: "Electronics" },
    { id: 3, name: "T-Shirt", price: 19, category: "Clothing" },
    { id: 4, name: "Jeans", price: 49, category: "Clothing" },
  ],
  filter: "All",
  cart: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "ADD_TO_CART": {
      const exists = state.cart.find((item) => item.id === action.payload.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, qty: action.payload.qty }
            : item,
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
