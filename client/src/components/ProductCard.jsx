import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  return (
    <div className="product-card">
      <Link to={`/product/${product._id}`}>
        <div className="product-image">
          <img src={product.image} alt={product.name} loading="lazy" />
          {product.countInStock === 0 && (
            <span className="out-of-stock-badge">Out of Stock</span>
          )}
        </div>
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product._id}`}>
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <p className="product-description">
          {product.description.length > 100
            ? product.description.substring(0, 100) + '...'
            : product.description}
        </p>
        <div className="product-bottom">
          <span className="product-price">${product.price.toFixed(2)}</span>
          {user ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => addToCart(product)}
              disabled={product.countInStock === 0}
            >
              Add to Cart
            </button>
          ) : (
            <Link to="/login" className="btn btn-secondary btn-sm">
              Login to Buy
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
