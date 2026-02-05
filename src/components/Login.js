import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const success = login(username, password);

    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="login-page">
      <header className="header">
        <div className="container">
          <div className="logo">
            <h1>Browserstack Cards</h1>
          </div>
        </div>
      </header>

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <p className="login-subtitle">Enter your credentials to continue</p>

          <form onSubmit={handleLogin} className="login-form">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login
            </button>
          </form>

          <p className="signup-hint">
            Don't have an account? Just enter a username and password to create one!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
