import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const shippingPrice = cartTotal > 100 ? 0 : 10;
  const totalPrice = cartTotal + shippingPrice;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map((item) => ({
            product: item.product,
            name: item.name,
            qty: item.qty,
            price: item.price,
            image: item.image,
          })),
          shippingAddress: { address, city, postalCode, country },
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Order failed');
      }

      clearCart();
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="checkout-content">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Address</h2>
          <div className="form-group">
            <label>Address</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="123 Main St" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="New York" />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required placeholder="10001" />
            </div>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required placeholder="United States" />
          </div>

          <h2>Payment Method</h2>
          <div className="payment-options">
            {['Credit Card', 'PayPal', 'Cash on Delivery'].map((method) => (
              <label key={method} className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                {method}
              </label>
            ))}
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
            {loading ? 'Processing Order...' : `Place Order — $${totalPrice.toFixed(2)}`}
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Items</h2>
          {cartItems.map((item) => (
            <div key={item.product} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p>{item.name}</p>
                <p>{item.qty} × ${item.price.toFixed(2)}</p>
              </div>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-totals">
            <div><span>Items Total</span><span>${cartTotal.toFixed(2)}</span></div>
            <div><span>Shipping</span><span>{shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}</span></div>
            <div className="grand-total"><span>Total</span><span>${totalPrice.toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
