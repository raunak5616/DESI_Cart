import { CartCard } from "../../components/cartCard";
import { useCart } from "../../context/card.context/useCartContext.js";
export  const Cart = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
   const handlePayment = async () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

}

  return (
    <>
      <div className="cart-page">
        <div className="cart-left">
          <h2 className="section-title">Your Cart</h2>
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <CartCard key={item.id} item={item} />
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>
        </div>
        <div className="cart-right">
          <h2 className="section-title">Order Summary</h2>
          <div className="summary-card">
            {cart.map((item) => (
              <div className="summary-row" key={item.id}>
                <span>
                  ({item.title} × {item.qty})
                </span>
                <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <hr />
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Delivery</span>
              <span className="green">FREE</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="green">− ₹0</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>₹{subtotal}</span>
            </div>
            <button className="pay-btn" onClick={handlePayment}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};
