import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaCakeCandles, FaHandHoldingHeart, FaHeart, FaUserGraduate, FaRing, FaHouse } from 'react-icons/fa6';
import './HomePage.css';

const HomePage = () => {
  const { addToCart, getCartCount } = useCart();
  const { user, logout } = useAuth();
  const [addedItems] = React.useState({});
  const [useSignIn, setUseSignIn] = React.useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (card) => {
    addToCart(card);
  };
  const giftCards = [
    { id: 1, name: 'eBay Gift Card', price: '$10 - $500', image: '/logos/ebay.svg', badge: 'BEST SELLER' },
    { id: 2, name: 'Mastercard Gift Card', price: '$10 - $250', image: '/logos/mastercard.svg', badge: null },
    { id: 3, name: 'Amazon Gift Card', price: '$10 - $2000', image: '/logos/amazon.svg', badge: 'FEATURED' },
    { id: 4, name: 'Apple Gift Card', price: '$10 - $500', image: '/logos/apple.svg', badge: null },
  ];

  const popularBrands = [
    { name: 'Chipotle', image: '/logos/chipotle.svg' },
    { name: 'Amazon', image: '/logos/amazon.svg' },
    { name: 'Starbucks', image: '/logos/starbucks.svg' },
    { name: 'Walmart', image: '/logos/walmart.svg' },
    { name: 'Apple', image: '/logos/apple.svg' },
    { name: 'Google Play', image: '/logos/google-play.svg' },
    { name: 'Netflix', image: '/logos/netflix.svg' },
    { name: 'Uber', image: '/logos/uber.svg' },
  ];

  const occasions = [
    { name: 'Birthday', icon: <FaCakeCandles /> },
    { name: 'Thank You', icon: <FaHandHoldingHeart /> },
    { name: 'Anniversary', icon: <FaHeart /> },
    { name: 'Graduation', icon: <FaUserGraduate /> },
    { name: 'Wedding', icon: <FaRing /> },
    { name: 'New Home', icon: <FaHouse /> },
  ];

  const allProducts = [
    { id: 1, name: 'eBay Gift Card', price: '$10 - $500', image: '/logos/ebay.svg', badge: 'BEST SELLER' },
    { id: 3, name: 'Amazon Gift Card', price: '$10 - $2000', image: '/logos/amazon.svg', badge: 'FEATURED' },
    { id: 4, name: 'Apple Gift Card', price: '$10 - $500', image: '/logos/apple.svg', badge: null },
    { id: 9, name: 'Walmart Gift Card', price: '$10 - $500', image: '/logos/walmart.svg', badge: null },
    { id: 16, name: 'Airbnb Gift Card', price: '$50 - $500', image: '/logos/airbnb.svg', badge: 'TRAVEL' },
  ];

  const handleOccasionClick = (occasionName) => {
    const slug = occasionName.toLowerCase().replace(' ', '-');

    if (occasionName === 'Birthday') {
      const product = allProducts.find(p => p.name.includes('Walmart'));
      if (product) addToCart(product);
    } else if (occasionName === 'Anniversary') {
      const product = allProducts.find(p => p.name.includes('Amazon'));
      if (product) addToCart(product);
    } else if (occasionName === 'New Home') {
      const product = allProducts.find(p => p.name.includes('eBay'));
      if (product) addToCart(product);
    } else if (occasionName === 'Thank You') {
      const product = allProducts.find(p => p.name.includes('Airbnb'));
      if (product) addToCart(product);
    } else if (occasionName === 'Wedding') {
      const product = allProducts.find(p => p.name.includes('Apple'));
      if (product) addToCart(product);
    } else if (occasionName === 'Graduation') {
      navigate('/loading');
    } else {
      // Fallback for others
      navigate(`/gift-cards?occasion=${slug}`);
    }
  };

  return (
    <div className="homepage">
      {/* Top Navigation Bar */}
      <div className="top-nav">
        <div className="container">
          <div className="top-nav-links">
            <Link to="/track-order" className="top-nav-link">TRACK ORDER</Link>
            <span className="separator">|</span>
            <button className="top-nav-button">ACTIVATE</button>
            <span className="separator">|</span>
            <button className="top-nav-button">CHECK BALANCE</button>
            <span className="separator">|</span>
            <button className="top-nav-button">SUPPORT</button>
          </div>
          <div className="top-nav-right">
            <label className="toggle-switch">
              <input
                type="checkbox"
                className="toggle-input"
                checked={useSignIn}
                onChange={(e) => setUseSignIn(e.target.checked)}
              />
              <span className="toggle-slider"></span>
              <span className="toggle-label">Use "Sign In"</span>
            </label>
            <span className="separator" style={{ margin: '0 10px' }}>|</span>
            <button className="top-nav-button">Gift card for business</button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Browserstack Cards</h1>
          </div>
          <nav className="nav">
            <Link to="/gift-cards" className="nav-link">Gift Cards</Link>
            {user ? (
              <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontWeight: 600, color: '#333' }}>
                  Hi, {user.username.split('@')[0].charAt(0).toUpperCase() + user.username.split('@')[0].slice(1)}
                </span>
                <button
                  onClick={logout}
                  style={{
                    background: 'none',
                    border: '1px solid #ddd',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="nav-link">{useSignIn ? 'Sign In' : 'Login'}</Link>
            )}
            <Link to="/cart" className="nav-link cart-icon">
              Cart ({getCartCount()})
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-promo">
        <div className="container">
          <div className="hero-content">
            <h2 className="hero-title">The Perfect Gift, Instantly</h2>
            <p className="hero-description">Shop digital gift cards for top brands like Amazon, Apple, and more. Delivered instantly to your inbox.</p>
            <Link to="/gift-cards" className="hero-cta">Shop now</Link>
          </div>
        </div>
      </section>

      {/* Featured Gift Cards */}
      <section className="featured-section">
        <div className="container">
          <h2 className="section-heading">Buy gift cards from trusted brands</h2>
          <div className="gift-cards-grid">
            {giftCards.map((card) => (
              <div key={card.id} className="gift-card-item">
                {card.badge && <span className="badge">{card.badge}</span>}
                <div className="card-image">
                  <img src={card.image} alt={card.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <div className="card-image-fallback" style={{ display: 'none' }}>{card.name}</div>
                </div>
                <h3 className="card-name">{card.name}</h3>
                <p className="card-price">{card.price}</p>
                <button
                  className={`card-button ${addedItems[card.id] ? 'added' : ''}`}
                  onClick={() => handleAddToCart(card)}
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Occasions Section */}
      <section className="occasions-section">
        <div className="container">
          <h2 className="section-heading">Shop by occasion</h2>
          <div className="occasions-grid">
            {occasions.map((occasion, index) => (
              <div key={index} className="occasion-item" onClick={() => handleOccasionClick(occasion.name)}>
                <div className="occasion-icon">{occasion.icon}</div>
                <p className="occasion-name">{occasion.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h2 className="section-heading">Popular brands</h2>
          <div className="brands-grid">
            {popularBrands.map((brand, index) => (
              <div key={index} className="brand-item">
                <div className="brand-icon">
                  <img src={brand.image} alt={brand.name} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <div className="brand-icon-fallback" style={{ display: 'none' }}>{brand.name.charAt(0)}</div>
                </div>
                <p className="brand-name">{brand.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About</h4>
              <ul>
                <li><button className="footer-link">HOME</button></li>
                <li><button className="footer-link">About Us</button></li>
                <li><button className="footer-link">Customer Reviews</button></li>
                <li><button className="footer-link">Blog</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><button className="footer-link">FAQs</button></li>
                <li><button className="footer-link">Check Balance</button></li>
                <li><button className="footer-link">Order Status</button></li>
                <li><button className="footer-link">Contact Us</button></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><button className="footer-link">Terms of Use</button></li>
                <li><button className="footer-link">Privacy Policy</button></li>
                <li><button className="footer-link">Cookie Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Browserstack Cards. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
