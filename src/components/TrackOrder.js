import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../utils/orderUtils';
import './Cart.css';

const TrackOrder = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (user) {
            const userOrders = getOrders(user.email);
            setOrders(userOrders.reverse()); // Most recent first
        }
    }, [user]);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const parsePrice = (priceInput) => {
        if (typeof priceInput === 'number') return priceInput;
        if (typeof priceInput === 'string') {
            const matches = priceInput.match(/\$(\d+(\.\d+)?)/);
            if (matches && matches[1]) {
                return parseFloat(matches[1]);
            }
        }
        return 0;
    };

    if (!user) {
        return (
            <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                <h2>Please log in to track your orders</h2>
                <Link to="/login" className="continue-shopping">Go to Login</Link>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="container" style={{ padding: '50px 0', textAlign: 'center' }}>
                <h2>No orders found</h2>
                <p style={{ marginBottom: '30px', color: '#666' }}>You haven't placed any orders yet.</p>
                <Link to="/gift-cards" className="continue-shopping">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <h1 className="cart-title">Track Your Orders</h1>

                {!selectedOrder ? (
                    <div style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
                        <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>Order History</h2>
                        {orders.map((order, index) => (
                            <div
                                key={`${order.orderId}-${index}`}
                                style={{
                                    padding: '20px',
                                    marginBottom: '15px',
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem', color: '#007bff' }}>
                                            {order.orderId}
                                        </h3>
                                        <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                                            {formatDate(order.date)}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ margin: '0 0 5px 0', fontSize: '0.9rem', color: '#666' }}>
                                            {order.items.length} item(s)
                                        </p>
                                        <p style={{ margin: '0', fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>
                                            ${order.total.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ background: 'white', padding: '30px', borderRadius: '8px' }}>
                        <button
                            onClick={() => setSelectedOrder(null)}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: '#007bff',
                                cursor: 'pointer',
                                fontSize: '1rem',
                                marginBottom: '20px',
                                padding: '0'
                            }}
                        >
                            ← Back to all orders
                        </button>

                        <h2 style={{ marginBottom: '10px', fontSize: '1.8rem' }}>Order Details</h2>
                        <p style={{ color: '#007bff', fontSize: '1.2rem', marginBottom: '5px', fontWeight: 'bold' }}>
                            {selectedOrder.orderId}
                        </p>
                        <p style={{ color: '#666', marginBottom: '30px' }}>
                            Placed on {formatDate(selectedOrder.date)}
                        </p>

                        <h3 style={{ marginBottom: '15px', fontSize: '1.3rem' }}>Items Purchased</h3>
                        {selectedOrder.items.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '15px 0',
                                    borderBottom: '1px solid #eee'
                                }}
                            >
                                <div>
                                    <p style={{ margin: '0 0 5px 0', fontWeight: '600' }}>{item.name}</p>
                                    <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>
                                        Quantity: {item.quantity}
                                    </p>
                                </div>
                                <p style={{ margin: '0', fontWeight: 'bold' }}>
                                    ${(parsePrice(item.price) * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}

                        <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '2px solid #333' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold' }}>
                                <span>Total Paid</span>
                                <span>${selectedOrder.total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrackOrder;
