require('dotenv').config();
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// Environment variables with defaults
const PORT = process.env.PORT || 5000;
const MENU_SERVICE_URL = process.env.MENU_SERVICE_URL || "http://menu-service:5001";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://order-service:5002";
const RESERVATION_SERVICE_URL = process.env.RESERVATION_SERVICE_URL || "http://reservation-service:5003";
const CONTACT_SERVICE_URL = process.env.CONTACT_SERVICE_URL || "http://contact-service:5004";

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Proxy middleware options
const proxyOptions = {
  changeOrigin: true,
  onError: (err, req, res) => {
    console.error(`Proxy Error: ${err.message}`);
    res.status(502).json({ error: 'Service temporarily unavailable' });
  }
};

// Service routes with error handling
app.use("/uploads", createProxyMiddleware({
  ...proxyOptions,
  target: MENU_SERVICE_URL,
}));

app.use("/api/menu", createProxyMiddleware({
  ...proxyOptions,
  target: MENU_SERVICE_URL,
  pathRewrite: {
    "^/api/menu": "/api/menu",
  },
}));

app.use("/api/orders", createProxyMiddleware({
  ...proxyOptions,
  target: ORDER_SERVICE_URL,
  pathRewrite: {
    "^/api/orders": "/api/orders",
  },
}));

app.use("/api/reservation", createProxyMiddleware({
  ...proxyOptions,
  target: RESERVATION_SERVICE_URL,
  pathRewrite: {
    "^/api/reservation": "/api/reservation",
  },
}));

app.use("/api/contact", createProxyMiddleware({
  ...proxyOptions,
  target: CONTACT_SERVICE_URL,
  pathRewrite: {
    "^/api/contact": "/api/contact",
  },
}));

// Default route
app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running",
    version: "1.0.0",
    endpoints: [
      "/api/menu",
      "/api/orders",
      "/api/reservation",
      "/api/contact",
      "/health"
    ]
  });
});

// Apply error handling middleware
app.use(errorHandler);

// Start API Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running on http://localhost:${PORT}`);
  console.log("Connected services:");
  console.log(`- Menu Service: ${MENU_SERVICE_URL}`);
  console.log(`- Order Service: ${ORDER_SERVICE_URL}`);
  console.log(`- Reservation Service: ${RESERVATION_SERVICE_URL}`);
  console.log(`- Contact Service: ${CONTACT_SERVICE_URL}`);
});
