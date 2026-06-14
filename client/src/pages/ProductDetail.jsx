import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (data.message) {
          setError(data.message);
        } else {
          setProduct(data);
        }
      } catch {
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!product) return <div className="error-message">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  return (
    <div className="product-detail-page">
      <Link to="/" className="back-link">← Back to Products</Link>
      <div className="product-detail">
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-meta">
            <span className={`stock ${product.countInStock > 0 ? 'in-stock' : 'out-stock'}`}>
              {product.countInStock > 0 ? `In Stock (${product.countInStock} available)` : 'Out of Stock'}
            </span>
          </div>
          {product.countInStock > 0 && (
            <div className="product-actions">
              <div className="qty-selector">
                <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(product.countInStock, qty + 1))} disabled={qty >= product.countInStock}>+</button>
              </div>
              {user ? (
                <button className="btn btn-primary btn-lg" onClick={handleAddToCart}>
                  Add to Cart
                </button>
              ) : (
                <Link to="/login" className="btn btn-secondary btn-lg">Login to Purchase</Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
