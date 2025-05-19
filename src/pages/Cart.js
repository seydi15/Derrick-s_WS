import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const calculateItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const handleClear = () => {
    clearCart();
    setShowModal(false);
  };

  const handleOrder = () => {
    if (!user) {
      setError('You must be logged in to place an order.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    // Placeholder order logic – you can replace with a real API call
    alert(`Order placed successfully by ${user.username || user.email}!`);
    clearCart();
  };

  return (
    <div className="cart-page">
      <h2>Your Shopping Cart</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {cart.length === 0 ? (
        <div className="cart-message">Your cart is currently empty.</div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-info">
                  <div className="item-name"><strong>{item.name}</strong></div>
                  <div className="item-price">${item.price} x {item.quantity}</div>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(index)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  <button className="remove-btn" onClick={() => removeFromCart(index)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="total-price">
            <strong>Total Items: {calculateItemCount()} | Total Price: ${calculateTotal()}</strong>
          </div>

          <div className="cart-actions">
            <button className="clear-btn" onClick={() => setShowModal(true)}>
              Clear Cart
            </button>
            <button className="order-btn" onClick={handleOrder}>
              Place Order
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Clear Cart</h3>
            <p>Are you sure you want to clear all items from your cart?</p>
            <div className="modal-actions">
              <button onClick={handleClear} className="confirm-btn">Yes, Clear</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
