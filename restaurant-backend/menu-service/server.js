require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const menuRoutes = require('./routes/menuRoutes');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/menu', menuRoutes);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant';
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Menu Service connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Server
app.listen(PORT, () => {
    console.log(`Menu Service running on port ${PORT}`);
});
