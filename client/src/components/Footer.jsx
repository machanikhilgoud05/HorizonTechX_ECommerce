import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Horizon TechX</h3>
          <p>Your trusted destination for premium products. Quality, reliability, and customer satisfaction guaranteed.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/cart">Cart</a>
          <a href="/orders">Orders</a>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>support@horizontechx.com</p>
          <p>+1 (555) 123-4567</p>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Horizon TechX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
