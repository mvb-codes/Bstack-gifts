# Known Bugs and Issues

This document tracks known visual and functional defects within the Browserstack Gift application.

## 1. Cross-Browser Rendering Issues
- **Browsers**: Firefox
- **Description**: Certain layout elements, particularly the modern CSS gradients and side drawer animations, exhibit inconsistent behavior or visual glitches in this browser.
- **Status**: Open

## 2. Intentional Functional Defects (for QA/Demo)
- **Feature**: Shop by Occasion -> Graduation
- **Description**: Clicking the "Graduation" occasion button leads to an infinite loading spinner page that never resolves.
- **Status**: Expected Behavior (Intentional)

## 3. Google Play Store Gift Card
- **Area**: Google Play Store gift card order ID issue
- **Description**: When a user adds a Google Play Store gift card to the cart and completes the checkout, the order is created successfully. However, when the user opens the Track Order section, an additional order ID (the same as the original one) is displayed, but it contains a different gift card order.
- **Status**: Open


## 4. Missing Gift Card Logos
- **Area**: Gift Cards display
- **Description**: Certain gift card logos are not displaying in the gift cards section, showing fallback text instead of the brand logos.
- **Status**: Open

## 5. Shop Now Button - Mobile Viewport Issue
- **Area**: Gift Cards - Shop Now functionality
- **Description**: The "Shop Now" button becomes non-clickable or disappears entirely on specific mobile viewport widths. This issue only occurs when rendered on mobile viewports; desktop rendering works fine.
- **Status**: Open

