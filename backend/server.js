const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bloodbanks', require('./routes/bloodBankRoutes'));
app.use('/api/requests', require('./routes/bloodRequestRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Auto-seed database if empty
const autoSeedIfEmpty = async () => {
  try {
    const BloodBank = require('./models/BloodBank');
    const User = require('./models/User');
    const count = await BloodBank.countDocuments();
    if (count === 0) {
      console.log('[Auto-Seed] No blood banks found. Populating seed data...');
      const seedFunc = require('./seedRunner');
      await seedFunc();
    }
  } catch (err) {
    console.error('[Auto-Seed Error]', err.message);
  }
};


// Root Healthcheck Endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Community Blood Bank Locator API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      bloodbanks: '/api/bloodbanks',
      requests: '/api/requests',
      users: '/api/users'
    }
  });
});

// Centralized Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log(`[Server] Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  await autoSeedIfEmpty();
});


// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`[Unhandled Rejection] Error: ${err.message}`);
});

module.exports = app;
