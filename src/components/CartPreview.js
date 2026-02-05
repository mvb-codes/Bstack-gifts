import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartPreview.css';

const CartPreview = () => {
    const { showCartPreview, closeCartPreview, cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!showCartPreview) {
        return null;
    }

    const handleCheckout = () => {
        closeCartPreview();
        if (user) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target.className === 'cart-sidebar-overlay') {
            closeCartPreview();
        }
    };

    return (
        <div className="cart-sidebar-overlay" onClick={handleBackdropClick}>
            <div className={`cart-sidebar ${showCartPreview ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h3>Shopping Bag <span className="item-count">({cartItems.length} items)</span></h3>
                    <button className="close-btn" onClick={closeCartPreview}>&times;</button>
                </div>

                <div className="cart-sidebar-content">
                    {cartItems.length === 0 ? (
                        <div className="empty-cart-message">Your bag is empty.</div>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.id} className="sidebar-item">
                                <img src={item.image} alt={item.name} className="sidebar-item-image" />
                                <div className="sidebar-item-details">
                                    <div className="sidebar-item-name">{item.name}</div>
                                    <div className="sidebar-item-price">{item.price}</div>
                                    <div className="sidebar-qty-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <button className="sidebar-remove-btn" onClick={() => removeFromCart(item.id)}>&times;</button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-sidebar-footer">
                    <div className="subtotal-row">
                        <span>Subtotal:</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                    <button className="checkout-btn sidebar-checkout-btn" onClick={handleCheckout} disabled={cartItems.length === 0}>
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPreview;
