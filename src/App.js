import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import GiftCards from './components/GiftCards';
import LoadingPage from './components/LoadingPage';


import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import TrackOrder from './components/TrackOrder';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartPreview from './components/CartPreview';
import { startBrowserDetection } from './utils/browserDetection';
import './App.css';

function App() {
  React.useEffect(() => {
    startBrowserDetection();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="App">
            <CartPreview />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/cart" element={<Cart />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/loading" element={<LoadingPage />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
