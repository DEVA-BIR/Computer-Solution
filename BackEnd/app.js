// Load environment variables FIRST
require("dotenv").config();

// Imports
const express = require("express");
const cors = require("cors");
const sanitize = require("sanitize");

// Create app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// CORS Configuration
// =========================
const allowedOrigins = [
  "http://localhost:4540",
  "https://computer-solution-psi-self.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin header (Postman, mobile apps, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// =========================
// Routes
// =========================
const customerRoutes = require("./Routes/customer.routes");
app.use("/api", customerRoutes);

const router = require("./Routes");
app.use("/api", router);

const orderRoutes = require("./Routes/order.routes");
app.use("/api/order", orderRoutes);

const deviceRoutes = require("./Routes/device.routes");
app.use("/api/device", deviceRoutes);

const serviceRoutes = require("./Routes/service.routes");
app.use("/api", serviceRoutes);

// =========================
// Home Route
// =========================
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});

// =========================
// Start Server
// =========================
const port = process.env.PORT || 3020;

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Export
module.exports = app;
