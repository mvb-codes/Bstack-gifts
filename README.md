# Browserstack Gifts

A modern React-based gift card marketplace featuring a comprehensive shopping experience with intentional browser-specific behaviors for testing and demonstration purposes.

## 🚀 Quick Start

```bash
npm start
```

Visit: **http://localhost:3000/**

## ✨ Features

### Core Functionality
- **Gift Card Marketplace**: Browse and purchase digital gift cards from major brands (Amazon, Apple, Walmart, Airbnb, Sephora, and more)
- **Shopping Cart**: Full cart system with sidebar preview, quantity management, and persistent storage
- **Secure Checkout**: Protected checkout flow requiring authentication with masked CVV input
- **User Authentication**: Login/logout system with personalized greetings

### Shop by Occasion
Special behaviors for different occasions:
- **Birthday** → Adds Walmart Gift Card directly to cart
- **Anniversary** → Adds Amazon Gift Card directly to cart
- **New Home** → Adds eBay Gift Card directly to cart
- **Thank You** → Adds Airbnb Gift Card directly to cart
- **Wedding** → Adds Apple Gift Card directly to cart
- **Graduation** → Intentional infinite loading bug (for testing)

### Browser-Specific UI (Testing Feature)
The site automatically detects and applies different visual states based on the browser:

- **Chrome/Edge**: Normal, clean UI
- **Firefox**: Light blue background tint + broken layout mode (overlapping cards, Comic Sans, red borders)
- **Safari**: Light red background tint + broken layout mode

This feature demonstrates cross-browser compatibility testing scenarios.

## 🎨 Design Highlights

- Modern purple-to-blue gradient hero section
- Professional React Icons throughout
- Smooth cart sidebar drawer animations
- Fully responsive layout
- CSS variable-based theming system

## 🐛 Known Issues

See `bugs.md` for a complete list of intentional and reported bugs.

## 📁 Project Structure

```
src/
├── components/     # React components (HomePage, GiftCards, Cart, etc.)
├── context/        # React contexts (Auth, Cart, Theme)
├── utils/          # Utilities (browser detection)
└── App.js          # Main application entry
```

## 🔐 Test Credentials

- **Username**: `user`
- **Password**: `pass`

## 🛠️ Tech Stack

- React 18
- React Router
- React Context API
- CSS Variables for theming
- React Icons (Font Awesome 6)
# Bstack-gifts
