# Horizon TechX E-Commerce

A full-stack e-commerce web application built with React, Node.js/Express, and MongoDB. Features user authentication, product catalog with search and filtering, shopping cart, order management, and an admin dashboard.

---

## Features

- **User Authentication** — Register, login, and JWT-based protected routes
- **Product Catalog** — Browse products with category filtering and search
- **Product Details** — View product info, stock status, and quantity selector
- **Shopping Cart** — Add/remove items, update quantities, cart summary with totals
- **Checkout & Orders** — Place orders with shipping address and payment method
- **Order History** — View past orders with status tracking
- **Admin Dashboard** — CRUD products, manage all orders, update statuses
- **Responsive Design** — Optimized for mobile, tablet, and desktop

---

## Screenshots

> _Screenshots will be added after deployment. The live application includes:_
>
> - **Home Page** — Hero banner, category filters, product grid
> - **Product Detail** — Image, description, price, stock, add to cart
> - **Cart** — Item list with quantity controls and order summary
> - **Checkout** — Shipping form, payment method selection, order review
> - **Orders** — Order history with status badges
> - **Admin Dashboard** — Stats, product management table, order management

---

## Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | React 18, Vite, React Router 6 |
| Backend    | Node.js, Express.js            |
| Database   | MongoDB, Mongoose ODM          |
| Auth       | JWT (JSON Web Tokens), bcryptjs|
| Styling    | CSS (custom, responsive)       |
| Deployment | Render (backend), MongoDB Atlas|

---

## Project Structure

```
HorizonTechX_ECommerce/
├── client/                    # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Navbar, Footer, ProductCard, ProtectedRoute
│   │   ├── context/           # AuthContext, CartContext
│   │   ├── pages/             # Home, Login, Register, ProductDetail,
│   │   │                      # Cart, Checkout, Orders, AdminDashboard
│   │   ├── styles/            # index.css (global styles)
│   │   ├── App.jsx            # Main app with routing
│   │   └── main.jsx           # Entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                    # Express backend
│   ├── config/                # Database connection
│   ├── middleware/             # Auth & Admin middleware
│   ├── models/                # User, Product, Order schemas
│   ├── routes/                # Auth, Products, Orders, Cart routes
│   ├── server.js              # Entry point
│   ├── seed.js                # Database seeder
│   └── package.json
├── package.json               # Root scripts
├── .gitignore
└── README.md
```

---

## Local Development Setup

### Prerequisites

- **Node.js** 18+ and **npm**
- **MongoDB** 7.0+ (local installation or Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/HorizonTechX_ECommerce.git
cd HorizonTechX_ECommerce
```

### 2. Install Dependencies

```bash
npm install --prefix server
npm install --prefix client
```

### 3. Configure Environment

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/horizontechx_ecommerce
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
```

### 4. Seed the Database

```bash
node server/seed.js
```

This creates sample data:

| Role  | Email                  | Password  |
| ----- | ---------------------- | --------- |
| Admin | admin@horizontechx.com | admin123  |
| Demo  | user@demo.com          | demo123   |

### 5. Start the Backend

```bash
node server/server.js
```

Server runs on **http://localhost:5000**

### 6. Start the Frontend

In a separate terminal:

```bash
npm run dev --prefix client
```

Frontend runs on **http://localhost:3000**

---

## API Endpoints

### Auth

| Method | Endpoint             | Description        | Auth Required |
| ------ | -------------------- | ------------------ | ------------- |
| POST   | `/api/auth/register` | Register new user  | No            |
| POST   | `/api/auth/login`    | Login user         | No            |
| GET    | `/api/auth/profile`  | Get user profile   | Yes           |

### Products

| Method | Endpoint                | Description              | Auth Required |
| ------ | ----------------------- | ------------------------ | ------------- |
| GET    | `/api/products`         | List all products        | No            |
| GET    | `/api/products/:id`     | Get product by ID        | No            |
| POST   | `/api/products`         | Create product           | Admin         |
| PUT    | `/api/products/:id`     | Update product           | Admin         |
| DELETE | `/api/products/:id`     | Delete product           | Admin         |

**Query parameters for `GET /api/products`:**
- `?category=Electronics` — Filter by category
- `?search=headphone` — Search by name

### Cart

| Method | Endpoint              | Description         | Auth Required |
| ------ | --------------------- | ------------------- | ------------- |
| GET    | `/api/cart`           | Get cart items      | Yes           |
| POST   | `/api/cart`           | Add item to cart    | Yes           |
| DELETE | `/api/cart/:productId`| Remove item         | Yes           |
| DELETE | `/api/cart`           | Clear cart          | Yes           |

### Orders

| Method | Endpoint                     | Description          | Auth Required |
| ------ | ---------------------------- | -------------------- | ------------- |
| POST   | `/api/orders`                | Place new order      | Yes           |
| GET    | `/api/orders`                | Get my orders        | Yes           |
| GET    | `/api/orders/:id`            | Get order details    | Yes           |
| GET    | `/api/orders/all`            | Get all orders       | Admin         |
| PUT    | `/api/orders/:id/deliver`    | Mark as delivered    | Admin         |
| PUT    | `/api/orders/:id/status`     | Update order status  | Admin         |

**Order statuses:** `Processing`, `Shipped`, `Delivered`, `Cancelled`

---

## Deployment Guide

### Deploy to Render

#### 1. Set Up MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign up
2. Create a **free M0 cluster**
3. In **Database Access**, create a database user (username/password)
4. In **Network Access**, add `0.0.0.0/0` to allow all connections
5. Click **Connect** → **Connect your application** → copy the connection string
6. Replace `<password>` with your database user's password

Your URI will look like:
```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/horizontechx_ecommerce?retryWrites=true&w=majority
```

#### 2. Deploy Backend on Render

1. Push code to GitHub (see instructions below)
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Name:** `horizontechx-ecommerce-api`
   - **Root Directory:** (leave as `/`)
   - **Runtime:** `Node`
   - **Build Command:**
     ```bash
     npm run build:all
     ```
   - **Start Command:**
     ```bash
     npm start
     ```
   - **Instance Type:** Free

5. Add environment variables:
   - `MONGODB_URI` — Your MongoDB Atlas URI
   - `JWT_SECRET` — A strong random string
   - `JWT_EXPIRES_IN` — `7d`
   - `NODE_ENV` — `production`

6. Click **Deploy Web Service**

#### 3. Seed Production Database

After deployment, run seed in Render shell:

```bash
node server/seed.js
```

Or use a one-off script by running `node server/seed.js` in the Render shell (available in the dashboard).

---

## Pushing to GitHub

### Prerequisites

- [GitHub](https://github.com) account
- [GitHub CLI](https://cli.github.com/) (`gh`) installed and authenticated

### Create Repository and Push

```bash
# Authenticate with GitHub (if not already done)
gh auth login

# Create the repository
gh repo create HorizonTechX_ECommerce --public --source=. --remote=origin --push

# Or manually:
# git remote add origin https://github.com/YOUR_USERNAME/HorizonTechX_ECommerce.git
# git branch -M main
# git push -u origin main
```

---

## Credentials (After Seeding)

| Role  | Email                  | Password  |
| ----- | ---------------------- | --------- |
| Admin | admin@horizontechx.com | admin123  |
| Demo  | user@demo.com          | demo123   |

---

## License

This project was created as part of the Horizon TechX Full Stack Development Internship.
