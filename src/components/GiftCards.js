import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './GiftCards.css';

const GiftCards = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [addedItems, setAddedItems] = useState({});
  const { addToCart, getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();



  const handleAddToCart = (card) => {
    addToCart(card);
  };

  // Filter Logic
  const getFilteredCards = () => {
    const params = new URLSearchParams(location.search);
    const occasion = params.get('occasion');

    let cards = giftCards;

    // First filter by Category tab
    if (selectedCategory !== 'all') {
      cards = cards.filter(card => card.category === selectedCategory);
    }

    // Filter by Occasion (all occasions now work)
    if (occasion) {
      cards = cards.filter(card => card.occasions && card.occasions.includes(occasion));
    }

    return cards;
  };

  const categories = [
    { id: 'all', name: 'All brands' },
    { id: 'visa', name: 'Visa®' },
    { id: 'mastercard', name: 'Mastercard®' },
    { id: 'egift', name: 'eGift' },
    { id: 'physical', name: 'Physical' },
  ];

  const giftCards = [
    { id: 1, name: 'eBay Gift Card', price: '$10 - $500', image: '/logos/ebay.svg', badge: 'BEST SELLER', category: 'egift', occasions: ['birthday', 'thank-you'] },
    { id: 2, name: 'Mastercard Gift Card', price: '$10 - $250', image: '/logos/mastercard.svg', badge: null, category: 'mastercard', occasions: ['wedding', 'anniversary'] },
    { id: 3, name: 'Amazon Gift Card', price: '$10 - $2000', image: '/logos/amazon.svg', badge: 'FEATURED', category: 'egift', occasions: ['birthday', 'wedding', 'graduation'] },
    { id: 4, name: 'Apple Gift Card', price: '$10 - $500', image: '/logos/apple.svg', badge: null, category: 'egift', occasions: ['birthday', 'graduation'] },
    { id: 5, name: 'Starbucks Gift Card', price: '$5 - $500', image: '/logos/starbucks.svg', badge: null, category: 'egift', occasions: ['thank-you', 'birthday'] },
    { id: 6, name: 'Google Play Gift Card', price: '$10 - $500', image: '/logos/google-play.svg', badge: null, category: 'egift', occasions: ['birthday'] },
    { id: 7, name: 'Netflix Gift Card', price: '$15 - $200', image: '/logos/netflix.svg', badge: null, category: 'egift', occasions: ['rainy-day'] },
    { id: 8, name: 'Uber Gift Card', price: '$15 - $500', image: '/logos/uber.svg', badge: null, category: 'egift', occasions: ['thank-you'] },
    { id: 9, name: 'Walmart Gift Card', price: '$10 - $500', image: '/logos/walmart.svg', badge: null, category: 'physical', occasions: ['new-home'] },
    { id: 10, name: 'Target GiftCard', price: '$10 - $500', image: '/logos/target.svg', badge: null, category: 'physical', occasions: ['baby-shower', 'wedding'] },
    { id: 11, name: 'Chipotle Gift Card', price: '$10 - $250', image: '/logos/chipotle.svg', badge: null, category: 'egift', occasions: ['thank-you'] },
    { id: 12, name: 'Visa Virtual Account', price: '$10 - $250', image: '/logos/visa.svg', badge: null, category: 'visa', occasions: ['anniversary'] },
    { id: 13, name: 'Best Buy Gift Card', price: '$25 - $500', image: '/logos/bestbuy.svg', badge: null, category: 'physical', occasions: ['wedding', 'new-home'] },
    { id: 14, name: 'Home Depot Gift Card', price: '$25 - $500', image: '/logos/homedepot.svg', badge: null, category: 'physical', occasions: ['new-home', 'wedding'] },
    { id: 15, name: 'Sephora Gift Card', price: '$10 - $250', image: '/logos/sephora.svg', badge: 'POPULAR', category: 'egift', occasions: ['birthday', 'anniversary'] },
    { id: 16, name: 'Airbnb Gift Card', price: '$50 - $500', image: '/logos/airbnb.svg', badge: 'TRAVEL', category: 'egift', occasions: ['wedding', 'anniversary'] },
  ];

  const filteredCards = getFilteredCards();

  return (
    <div className="gift-cards-page">
      {/* Top Navigation */}
      <div className="top-nav">
        <div className="container">
          <div className="top-nav-links">
            <Link to="/track-order" className="top-nav-link">TRACK ORDER</Link>
            <span className="separator">|</span>
            <a href="#" className="top-nav-link">ACTIVATE</a>
            <span className="separator">|</span>
            <a href="#" className="top-nav-link">CHECK BALANCE</a>
            <span className="separator">|</span>
            <a href="#" className="top-nav-link">SUPPORT</a>
          </div>
          <div className="top-nav-right">
            <a href="#" className="top-nav-link">Gift card for business</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <h1>Browserstack Cards</h1>
          </Link>
          <nav className="nav">
            <Link to="/gift-cards" className="nav-link active">Gift Cards</Link>
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
              <Link to="/login" className="nav-link">Login</Link>
            )}
            <Link to="/cart" className="nav-link cart-icon">
              Cart ({getCartCount()})
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <h1 className="page-title">Buy Gift Cards Online</h1>

          {/* Category Filter */}
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="gift-cards-grid">
            {filteredCards.map(card => (
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
                  onClick={() => handleAddToCart(card)}
                >
                  Shop Now
                </button>
              </div>
            ))}
          </div>

          {filteredCards.length === 0 && (
            <div className="no-results">
              <p>No gift cards found in this category.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About</h4>
              <ul>
                <li><a href="#">HOME</a></li>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Customer Reviews</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Check Balance</a></li>
                <li><a href="#">Order Status</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Terms of Use</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Cookie Policy</a></li>
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

export default GiftCards;
