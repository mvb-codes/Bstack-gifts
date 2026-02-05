import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaCakeCandles, FaHandHoldingHeart, FaHeart, FaUserGraduate } from 'react-icons/fa6';
import './HomePageAlternative.css';

const HomePageAlternative = () => {
    const { addToCart, getCartCount } = useCart();
    const { user, logout } = useAuth();

    const handleAddToCart = (card) => {
        addToCart(card);
    };

    const giftCards = [
        { id: 1, name: 'eBay Gift Card', price: '$10 - $500', image: '/logos/ebay.svg', badge: 'BEST SELLER' },
        { id: 2, name: 'Mastercard Gift Card', price: '$10 - $250', image: '/logos/mastercard.svg', badge: null },
        { id: 3, name: 'Amazon Gift Card', price: '$10 - $2000', image: '/logos/amazon.svg', badge: 'FEATURED' },
    ];

    const popularBrands = [
        { name: 'Chipotle', image: '/logos/chipotle.svg' },
        { name: 'Amazon', image: '/logos/amazon.svg' },
        { name: 'Starbucks', image: '/logos/starbucks.svg' },
        { name: 'Walmart', image: '/logos/walmart.svg' },
    ];

    const occasions = [
        { name: 'Birthday', icon: <FaCakeCandles /> },
        { name: 'Thank You', icon: <FaHandHoldingHeart /> },
        { name: 'Anniversary', icon: <FaHeart /> },
        { name: 'Graduation', icon: <FaUserGraduate /> },
    ];

    return (
        <div className="homepage-alt">
            {/* Main Header */}
            <header className="header" style={{ borderBottom: '2px solid #0d3b66' }}>
                <div className="container">
                    <div className="logo" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <img src="/logos/bstacklog.png" alt="Logo" style={{ height: "40px" }} />
                        <h1 style={{ color: "#0d3b66", fontWeight: 800 }}>BHN PRIME</h1>
                    </div>
                    <nav className="nav">
                        <Link to="/gift-cards" className="nav-link">Catalog</Link>
                        {user ? (
                            <button onClick={logout} className="nav-link" style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Sign Out</button>
                        ) : (
                            <Link to="/login" className="nav-link">Join Now</Link>
                        )}
                        <Link to="/cart" className="nav-link cart-icon" style={{ background: '#0d3b66' }}>
                            Cart ({getCartCount()})
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-promo">
                <div className="container">
                    <div className="hero-content">
                        <h2 className="hero-title">Elevate Your Gifting Experience</h2>
                        <p className="hero-description" style={{ fontSize: '1.8rem', opacity: 1, color: '#eef2f7' }}>
                            Discover premium digital assets and gift cards for the brands you love.
                            Efficiency meets elegance in every transaction.
                        </p>
                        <Link to="/gift-cards" className="hero-cta">Explore Collection</Link>
                    </div>
                </div>
            </section>

            {/* Popular Brands Section (Moved Up) */}
            <section className="brands-section">
                <div className="container">
                    <h2 className="section-heading" style={{ textAlign: 'left' }}>Elite Brands</h2>
                    <div className="brands-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        {popularBrands.map((brand, index) => (
                            <div key={index} className="brand-item">
                                <div className="brand-icon" style={{ width: '120px', height: '120px', borderRadius: '12px' }}>
                                    <img src={brand.image} alt={brand.name} />
                                </div>
                                <p className="brand-name" style={{ fontWeight: 700 }}>{brand.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Gift Cards */}
            <section className="featured-section">
                <div className="container">
                    <h2 className="section-heading">Curated Selection</h2>
                    <div className="gift-cards-grid">
                        {giftCards.map((card) => (
                            <div key={card.id} className="gift-card-item">
                                <div className="card-image" style={{ background: '#f8fafc', padding: '30px' }}>
                                    <img src={card.image} alt={card.name} />
                                </div>
                                <div style={{ padding: '25px' }}>
                                    <h3 className="card-name" style={{ margin: 0 }}>{card.name}</h3>
                                    <p className="card-price" style={{ color: '#64748b' }}>{card.price}</p>
                                    <button
                                        className="card-button"
                                        onClick={() => handleAddToCart(card)}
                                        style={{ width: '100%', padding: '15px' }}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Occasions Section */}
            <section className="occasions-section" style={{ padding: '80px 0' }}>
                <div className="container">
                    <h2 className="section-heading">Gifts for Every Moment</h2>
                    <div className="occasions-grid">
                        {occasions.map((occasion, index) => (
                            <div key={index} className="occasion-item" style={{ padding: '40px', borderRadius: '20px' }}>
                                <div className="occasion-icon" style={{ fontSize: '3.5rem' }}>{occasion.icon}</div>
                                <p className="occasion-name" style={{ fontSize: '1.2rem', marginTop: '15px' }}>{occasion.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer style={{ padding: '40px 0', background: '#0d3b66', color: 'white', textAlign: 'center' }}>
                <p>&copy; 2026 BHN PRIME | Premium Gifting Solutions</p>
            </footer>
        </div>
    );
};

export default HomePageAlternative;
