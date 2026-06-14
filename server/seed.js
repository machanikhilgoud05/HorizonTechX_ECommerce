const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config({ path: path.join(__dirname, '.env') });

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life. Features deep bass, comfortable over-ear design, and built-in microphone for calls.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
    countInStock: 50,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with heart rate monitoring, GPS tracking, sleep analysis, and 7-day battery life. Water resistant to 50 meters.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
    countInStock: 30,
  },
  {
    name: 'Classic Leather Backpack',
    description: 'Handcrafted genuine leather backpack with padded laptop compartment, multiple pockets, and adjustable straps. Perfect for travel and daily use.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
    countInStock: 45,
  },
  {
    name: 'Organic Cotton Hoodie',
    description: 'Sustainable organic cotton hoodie with a modern fit. Features a kangaroo pocket, adjustable hood, and ribbed cuffs. Available in multiple colors.',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500',
    category: 'Clothing',
    countInStock: 75,
  },
  {
    name: 'Mechanical Keyboard RGB',
    description: 'Full-size mechanical keyboard with customizable RGB backlighting, Cherry MX switches, and aluminum frame. Includes detachable USB-C cable.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
    category: 'Electronics',
    countInStock: 25,
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Double-wall vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free, leak-proof, and eco-friendly.',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    category: 'Accessories',
    countInStock: 100,
  },
  {
    name: 'Running Shoes Ultra',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for comfort on long runs with superior grip.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Clothing',
    countInStock: 60,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: 'Compact waterproof speaker with 360-degree sound, 20-hour battery, and built-in microphone. Perfect for outdoor adventures and pool parties.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
    category: 'Electronics',
    countInStock: 40,
  },
  {
    name: 'Canvas Messenger Bag',
    description: 'Vintage-style canvas messenger bag with multiple compartments. Fits up to 15-inch laptop. Features a padded shoulder strap and brass hardware.',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500',
    category: 'Accessories',
    countInStock: 55,
  },
  {
    name: 'Denim Jacket Classic',
    description: 'Timeless denim jacket made from premium cotton denim. Features button-front closure, chest pockets, and adjustable waist tabs. A wardrobe essential.',
    price: 74.99,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    category: 'Clothing',
    countInStock: 35,
  },
  {
    name: 'USB-C Hub 7-in-1',
    description: 'Multi-port USB-C hub with HDMI 4K output, USB 3.0 ports, SD/microSD card reader, and 100W Power Delivery pass-through. Compatible with all USB-C devices.',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=500',
    category: 'Electronics',
    countInStock: 70,
  },
  {
    name: 'Wool Beanie Hat',
    description: 'Soft merino wool beanie with a comfortable stretch fit. Keeps you warm in cold weather. Minimalist design with a folded brim.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500',
    category: 'Clothing',
    countInStock: 90,
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Product.deleteMany({});
    console.log('Products cleared');

    const adminExists = await User.findOne({ email: 'admin@horizontechx.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@horizontechx.com',
        password: 'admin123',
        isAdmin: true,
      });
      console.log('Admin user created');
    }

    const demoUserExists = await User.findOne({ email: 'user@demo.com' });
    if (!demoUserExists) {
      await User.create({
        name: 'Demo User',
        email: 'user@demo.com',
        password: 'demo123',
      });
      console.log('Demo user created');
    }

    await Product.insertMany(products);
    console.log('Products seeded');

    console.log('Seed completed!');
    console.log('Admin: admin@horizontechx.com / admin123');
    console.log('Demo:  user@demo.com / demo123');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
