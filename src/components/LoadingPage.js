import React from 'react';
import './LoadingPage.css';

const LoadingPage = () => {
    return (
        <div className="loading-page">
            <div className="spinner-container">
                <div className="spinner"></div>
                <p>Loading the best gifts for your graduation...</p>
            </div>
        </div>
    );
};

export default LoadingPage;
