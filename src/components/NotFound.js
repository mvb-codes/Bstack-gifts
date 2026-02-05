import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <h1 style={{ fontSize: '72px', margin: '0', color: '#172B4D' }}>404</h1>
            <h2 style={{ fontSize: '24px', margin: '10px 0 30px', color: '#6B778C' }}>page not found</h2>
            <Link to="/" style={{
                padding: '12px 24px',
                backgroundColor: '#0052CC',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontWeight: '600'
            }}>
                Go back to home
            </Link>
        </div>
    );
};

export default NotFound;
