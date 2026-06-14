const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const cartRoutes = require('./routes/cart');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Horizon TechX E-Commerce API is running' });
});

const __dirnamePath = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirnamePath, '..', 'client', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirnamePath, '..', 'client', 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    console.log('Starting server without database connection...');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} (without DB)`);
    });
  }
};

startServer();
