# Horizon TechX - E-Commerce Web Application

A full-stack e-commerce platform built with React, Node.js/Express, and MongoDB.

## Features

- **User Authentication** - Register, login, JWT-based auth
- **Product Catalog** - Browse, search, and filter products by category
- **Shopping Cart** - Add/remove items, update quantities
- **Order Management** - Checkout, order history, real-time status tracking
- **Admin Dashboard** - CRUD products, manage orders, update statuses
- **Responsive Design** - Optimized for mobile, tablet, and desktop

## Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React 18, Vite    |
| Backend  | Node.js, Express  |
| Database | MongoDB, Mongoose  |
| Auth     | JWT, bcryptjs     |

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB 7.0+ (running locally)

### 1. Clone & Install

```bash
cd HorizonTechX_ECommerce
npm install --prefix server
npm install --prefix client
```

### 2. Seed Database

```bash
node server/seed.js
```

This creates:
- **Admin**: `admin@horizontechx.com` / `admin123`
- **Demo**: `user@demo.com` / `demo123`
- 12 sample products

### 3. Start Development Servers

**Backend** (port 5000):
```bash
node server/server.js
```

**Frontend** (port 3000 - in a new terminal):
```bash
npm run dev --prefix client
```

### 4. Open in Browser

```
http://localhost:3000
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (auth)

### Products
- `GET /api/products` - List all products (supports `?category=X&search=Y`)
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Place order (auth)
- `GET /api/orders` - Get my orders (auth)
- `GET /api/orders/:id` - Get order details (auth)
- `GET /api/orders/all` - Get all orders (admin)
- `PUT /api/orders/:id/deliver` - Mark delivered (admin)
- `PUT /api/orders/:id/status` - Update status (admin)

## Project Structure

```
HorizonTechX_ECommerce/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── components/      # Navbar, Footer, ProductCard
│   │   ├── context/         # AuthContext, CartContext
│   │   ├── pages/           # Home, Login, Register, Cart, etc.
│   │   └── styles/          # Global CSS
│   └── vite.config.js
├── server/                  # Express backend
│   ├── config/              # Database connection
│   ├── middleware/          # Auth & Admin middleware
│   ├── models/              # User, Product, Order schemas
│   ├── routes/              # API route handlers
│   └── seed.js              # Database seeder
└── package.json
```
