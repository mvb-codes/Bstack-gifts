import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { generateOrderId, saveOrder } from '../utils/orderUtils';
import './Cart.css'; // Reusing some cart styles mainly for container

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Generate order ID
        const newOrderId = generateOrderId();

        // Create order data
        const orderData = {
            orderId: newOrderId,
            date: new Date().toISOString(),
            userEmail: user?.email || formData.email,
            items: cartItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            })),
            total: getCartTotal()
        };

        // Save order to localStorage
        saveOrder(orderData);

        // Simulate API call
        setTimeout(() => {
            setOrderId(newOrderId);
            setOrderPlaced(true);
            clearCart();
        }, 1500);
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                <h2>No items to checkout</h2>
                <button onClick={() => navigate('/gift-cards')} className="continue-shopping">Go to Shop</button>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                <div style={{ color: '#4BB543', fontSize: '4rem', marginBottom: '20px' }}>✓</div>
                <h1 style={{ marginBottom: '20px' }}>Congratulations! Your order has been placed</h1>
                <p style={{ marginBottom: '10px', fontSize: '1.3rem', color: '#333', fontWeight: 'bold' }}>Order ID: {orderId}</p>
                <p style={{ marginBottom: '50px', fontSize: '1.1rem', color: '#666' }}>Thank you for your purchase.</p>
                <button
                    onClick={() => navigate('/')}
                    className="checkout-btn"
                    style={{ marginTop: '20px', maxWidth: '300px' }}
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '40px 0' }}>
            <h1 className="cart-title">Checkout</h1>
            <div className="cart-container">
                <div className="cart-items" style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Billing Details</h2>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                required
                                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                required
                                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                onChange={handleChange}
                            />
                        </div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            required
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleChange}
                        />
                        <h3 style={{ marginTop: '20px', marginBottom: '10px' }}>Payment Info</h3>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            required
                            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                            onChange={handleChange}
                        />
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                required
                                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                onChange={handleChange}
                            />
                            <input
                                type="password"
                                name="cvv"
                                placeholder="CVV"
                                required
                                style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="checkout-btn" style={{ marginTop: '20px' }}>
                            Pay ${getCartTotal().toFixed(2)}
                        </button>
                    </form>
                </div>

                <div className="cart-summary">
                    <h2 className="summary-title">Your Order</h2>
                    {cartItems.map(item => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                            <span>{item.name} x {item.quantity}</span>
                            <span>${(parseFloat(item.price.match(/\$(\d+)/)[1]) * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="summary-row summary-total">
                        <span>Total</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
