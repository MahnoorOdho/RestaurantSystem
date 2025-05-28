require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const reservationRoutes = require('./routes/reservationRoutes');
const cors = require('cors');

const app = express();

// Configure CORS with specific options
const allowedOrigins = [
  'http://localhost:5173',          // Local development
  'http://localhost:3000',          // Local production build
  'http://localhost:5000',          // Local API Gateway
  'https://restaurantsystemfrontend.onrender.com', // Deployed frontend
  'https://restaurantsystemapigateway.onrender.com' // Deployed API Gateway
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  maxAge: 86400 // 24 hours
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/reservation', reservationRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
const PORT = process.env.PORT || 5003;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Reservation Service connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Server
app.listen(PORT, () => {
    console.log(`Reservation Service running on port ${PORT}`);
});
