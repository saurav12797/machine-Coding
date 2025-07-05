import { useCart } from "./cartContext";

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cart } = state;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🛒 Cart</h2>
      {cart.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} style={{ marginBottom: "1rem" }}>
            <strong>{item.name}</strong> - ${item.price} ×{" "}
            <input
              type="number"
              value={item.qty}
              min="1"
              style={{ width: "50px" }}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_QTY",
                  payload: { id: item.id, qty: +e.target.value },
                })
              }
            />
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
              }
            >
              ❌ Remove
            </button>
          </div>
        ))
      )}

      {cart.length > 0 && <h3>Total: ${total.toFixed(2)}</h3>}
    </div>
  );
};

export default Cart;
