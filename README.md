# All Feet Fashion — Premium Fashion E-Commerce Platform

A production-ready, ultra-premium fashion e-commerce web application for **All Feet Fashion**, seamlessly blending editorial haute couture aesthetics with modern streetwear, conversational AI styling, and direct WhatsApp commerce.

---

## 📍 Store Information (Real-World Flagship)
* **Store Name:** All Feet Fashion
* **Boutique Address:** School Bazar, Bibiganj / School Bazzar Chawk (near Green Valley), Midnapore (Medinipur), West Bengal - 721101, India
* **GPS Coordinates:** `22.4130133, 87.3270268`
* **Direct Helpline & WhatsApp Orders:** `+91 9382107724`
* **Instagram:** `@allfeet.fashion`
* **Store Hours:** Monday – Sunday: 10:00 AM – 9:30 PM

---

## ✨ Features

* **Cinematic "Scroll to Enter" Hero Experience:** GSAP ScrollTrigger controlled curtain reveal opening scene with smooth depth parallax and instant skip support.
* **Curated 6 Categories:** Watches, Perfumes, Shoes & Sneakers, Heavyweight Boxy Clothing, Polarized Sunglasses, and Leather Accessories.
* **Multi-Facet Catalog (`/shop`):** Real-time search, price range sliders, size filters, tag badges, and dynamic sorting.
* **Luxury Product Detail Page (`/product/[slug]`):** High-resolution image zoom, thumbnail navigator, fullscreen lightbox, size guide modal, Indian pincode delivery estimator, verified client reviews, and direct WhatsApp order generation.
* **AI Style Assistant (✦ Floating Widget):** Conversational personal stylist recommending products from the actual catalog with one-click Add-to-Bag buttons.
* **Slide-Out Cart & Dynamic Discounts:** Free shipping meter (threshold ₹1,999), automatic volume discounts (Buy 2 → 15%, Buy 3 → 20%, Buy 5 → 30%), and coupon codes (`WELCOME10`, `LUXE20`, `FREESHIP`).
* **Multi-Channel Checkout (`/checkout`):**
  * **Order via WhatsApp:** Pre-fills formatted order details directly to `+91 9382107724`.
  * Online UPI / Card payment simulation.
  * Cash on Delivery (COD).
* **Consignment Tracking Portal (`/track-order`):** Visual 6-stage milestone tracker (`ORDER PLACED` → `CONFIRMED` → `PACKED` → `SHIPPED` → `OUT FOR DELIVERY` → `DELIVERED`).
* **Staff Admin Dashboard (`/admin`):** Revenue KPIs, product CRUD, order status lifecycle updates, and coupon management.
* **Custom Luxury 404 Page:** Fashion editorial copy (*"are you lost, baby girl? The page you’re looking for doesn’t exist but text 9382107724 for assistance."*).

---

## 🛠 Tech Stack

* **Framework:** Next.js 15 (App Router, React 19, TypeScript)
* **Styling:** Tailwind CSS with custom luxury typography and dark editorial theme
* **Animations:** GSAP, GSAP ScrollTrigger, Framer Motion
* **Icons:** Lucide React
* **Confetti:** Canvas-Confetti

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📦 Deployment

This project is optimized for zero-config deployment on [Vercel](https://vercel.com) or any Node.js hosting platform.
