// Load environment variables FIRST
require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");

// Create app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS (for both local + production)
app.use(
  cors({
    origin: ["http://localhost:2090", "*"], // replace * with frontend URL later
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Root route (FIX: Cannot GET /)
app.get("/", (req, res) => {
  res.send("Backend is running on Render 🚀");
});

// ========================
// ROUTES
// ========================

const customerRoutes = require("./Routes/customer.routes");
const orderRoutes = require("./Routes/order.routes");
const vehicleRoutes = require("./Routes/vehicle.routes");
const serviceRoutes = require("./Routes/service.routes");
const mainRouter = require("./Routes");

// Better structure (recommended)
app.use("/api/customers", customerRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api", mainRouter);

// ========================
// EXPORT (IMPORTANT FOR RENDER)
// ========================
module.exports = app;