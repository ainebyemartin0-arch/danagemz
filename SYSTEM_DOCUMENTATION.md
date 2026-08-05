# Dana Gemz Collection — System Architecture & Features

**Version:** 1.0.0  
**Platform:** Luxury E-Commerce Web Application  
**Target Market:** Uganda (Mobile-First, WhatsApp-Driven Commerce)  

---

## 1. Project Overview
Dana Gemz Collection is a state-of-the-art luxury jewelry e-commerce platform built for a Ugandan business owner. It transitions her business from a purely social-media-driven operation (TikTok/Instagram) into a permanent, professional digital storefront.

The system is designed to feel like a million-dollar Silicon Valley luxury boutique while optimizing for the local Ugandan market (where transactions and customer support happen primarily via WhatsApp and Mobile Money).

---

## 2. Frontend Features & Functionalities (UI/UX)

The frontend is built strictly with **Vanilla HTML5, CSS3, and ES6+ JavaScript**. No frameworks (React/Vue) or utility libraries (Tailwind) are used, ensuring ultra-fast load times.

### A. Elite Design System
*   **Aesthetic:** Dark Mode Evolution & Glassmorphism.
*   **Colors:** Deep Black (`#050505`) background, Luxury Gold (`#D4AF37`) accents, WhatsApp Green (`#25D366`) for conversions.
*   **Typography:** 'Playfair Display' (Headings) for classic luxury, 'Inter' (Body) for modern readability.
*   **Design Tokens:** All colors, radii, shadows, and spacing are defined as CSS Variables for consistency.

### B. Navigation & Layout
*   **Dynamic Sticky Navbar:** Remains visible on scroll. Shrinks from 90px to 70px height and applies a frosted glass blur (`backdrop-filter: blur(16px)`) after scrolling 50px.
*   **3-Column Desktop Nav:** Logo (Left), Links (Center), Action Icons (Right).
*   **Mobile Bottom Navigation:** Fixed to the bottom of the screen on mobile devices for native-app-like navigation (Home, Shop, Cart, Contact).
*   **Off-Canvas Mobile Menu:** Smooth sliding menu with body-scroll locking.

### C. Cinematic Homepage
*   **Hero Section:** Full viewport height (`100vh`) with a Ken Burns effect (infinite slow zoom on background image). Staggered text entry on page load.
*   **Trust Badges:** 4-card layout highlighting business USPs (Authenticity, Delivery, Payments, Returns).
*   **Trending Products Grid:** Dynamically loads the 6 newest products.
*   **VIP Newsletter Signup:** Email capture form for marketing.

### D. Next-Gen Product Cards
*   **3D Tilt Effect:** Cards subtly tilt in 3D space based on cursor position.
*   **Interactive Overlays:** On hover, image zooms 5%, and a glassmorphism toolbar slides up containing Wishlist, Quick View, and Cart SVG icons.
*   **Shimmer Skeleton Loaders:** CSS-based loading animations instead of basic spinners.

### E. Shop & Product Details
*   **Dynamic Shop Page:** Displays all available products. Automatically hides out-of-stock items.
*   **Premium Product Detail Page:** 2-column layout (Sticky Image Left, Details Right). Includes breadcrumbs, price formatting (UGX), and a pure CSS accordion for Delivery/Return policies.
*   **Related Products:** "You May Also Like" section fetches 4 random products to encourage further browsing.

### F. Smart Cart System (Vanilla JS / LocalStorage)
*   **No-Database Cart:** Uses browser LocalStorage so guest carts persist without server overhead.
*   **Dynamic UI:** Cart badge updates instantly on the navbar. Cart page allows quantity adjustments and item removal.
*   **WhatsApp Checkout:** The crown jewel of the system. When checking out, JS compiles all cart items, quantities, and the total price into a perfectly formatted, URL-encoded WhatsApp message and opens the chat directly with Dana's number.

### G. Custom Orders ("Uniquely Yours")
*   **Luxury Form UI:** A centered glassmorphism card.
*   **Data Capture:** Collects Name, Phone, Design Description, and an optional Reference Image upload.
*   **Custom File Upload UI:** The ugly default browser file input is replaced with a dashed-border, drag-and-drop styled area.
*   **Dual Submission Paths:** Users can submit the form to the database OR click a secondary button to immediately chat on WhatsApp.

### H. Elite Animations & Micro-interactions
*   **Scroll Reveal:** Uses `IntersectionObserver` for a staggered fade-in/slide-up effect as elements enter the viewport.
*   **Material Ripple:** Buttons generate a localized circular ripple from the exact click coordinate.
*   **Toast Notifications:** Glassmorphic success messages slide in from the top right (used for form submissions and cart additions) instead of harsh browser alerts.

---

## 3. Backend Features & Functionalities (Django)

The backend is powered by **Django (Python)**, handling data logic, secure forms, and admin management.

### A. Database Models
1.  **Product:** Fields for name, description, price (Decimal), category (Rings, Necklaces, etc.), image, is_available (Boolean).
2.  **CustomOrder:** Fields for name, phone_number, description, reference_image, is_completed (Boolean).
3.  **Subscriber:** Fields for email (unique), subscribed_at.

### B. Admin Dashboard
*   Secure login system for Dana and Martin (multiple superusers).
*   **Product Management:** Full CRUD capabilities with category filtering.
*   **Custom Order Tracker:** View incoming custom jewelry requests, see uploaded reference images, and mark them as completed.
*   **Subscriber List:** View and manage VIP newsletter emails.

### C. Form Handling & Security
*   `CustomOrderForm` and `SubscriberForm` handle user input securely.
*   All forms are protected by Django's built-in CSRF (Cross-Site Request Forgery) middleware.

### D. Automated Deployment Scripts
*   **`create_admins` Command:** A custom Django management command that runs during server deployment. It checks if 'martin' and 'dana' exist, and if not, creates them using Environment Variables (bypassing the need for a terminal on Render's free tier).
*   **Database Seeding (`seed_data.json`):** A fixture file that automatically loads 10 luxury products into the database upon deployment, ensuring the site never looks empty on launch.

---

## 4. Production, Security & Cloud Architecture

### A. Cloud Infrastructure
*   **Hosting:** Render.com (Web Service).
*   **Database:** PostgreSQL (Render Free Tier) via `dj-database-url`. Automatically switches to local SQLite during development.
*   **Media Storage:** Cloudinary. All uploaded product images and custom order reference images are instantly sent to Cloudinary's cloud servers. This ensures images are never lost during server restarts and load instantly via global CDNs.

### B. Static File Serving
*   **WhiteNoise:** Serves all CSS and JS files directly through Django in production using WhiteNoise compression (`CompressedManifestStaticFilesStorage`), eliminating the need for a separate Nginx/AWS S3 setup.

### C. Elite Security Implementations
*   **HTTPS Enforcement:** `SECURE_SSL_REDIRECT = True` forces all HTTP traffic to HTTPS.
*   **HSTS (HTTP Strict Transport Security):** Locks browsers into HTTPS for 1 year to prevent downgrade attacks.
*   **Secure Cookies:** Session and CSRF cookies are marked `Secure`, meaning they can only be transmitted over encrypted connections.
*   **Clickjacking Protection:** `X_FRAME_OPTIONS = 'DENY'` stops malicious sites from embedding the platform in invisible iframes.
*   **Environment Variables:** All sensitive data (Secret Keys, Database URLs, Cloudinary API Keys) are hidden in `.env` files locally and injected via Render Environment Variables in production. No secrets are hardcoded.

---

## 5. Technical Stack Summary
*   **Backend:** Django 5.x, Python 3.x
*   **Frontend:** Vanilla HTML5, CSS3 (CSS Variables, Grid, Flexbox), ES6+ JavaScript
*   **Database:** PostgreSQL (Prod), SQLite (Dev)
*   **Media Cloud:** Cloudinary API
*   **Static Server:** WhiteNoise
*   **Hosting:** Render.com
*   **Version Control:** Git & GitHub

