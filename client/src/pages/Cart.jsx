import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.product} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <Link to={`/product/${item.product}`} className="cart-item-name">{item.name}</Link>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-qty">
                <button onClick={() => updateQty(item.product, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.product, item.qty + 1)} disabled={item.qty >= item.countInStock}>+</button>
              </div>
              <div className="cart-item-total">${(item.price * item.qty).toFixed(2)}</div>
              <button className="cart-item-remove" onClick={() => removeFromCart(item.product)}>✕</button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Items ({cartItems.reduce((a, c) => a + c.qty, 0)})</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{cartTotal > 100 ? 'FREE' : '$10.00'}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${(cartTotal + (cartTotal > 100 ? 0 : 10)).toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn btn-primary btn-block">Proceed to Checkout</Link>
          <Link to="/" className="btn btn-secondary btn-block">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
