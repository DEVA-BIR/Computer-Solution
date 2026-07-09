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

// ✅ FIXED CORS (allow your frontend)
app.use(
  cors({
    origin: "https://garage-management-rho.vercel.app", // your frontend port
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
const customerRoutes = require("./Routes/customer.routes");

app.use("/api", customerRoutes);
// ✅ Routes (with /api prefix)
const router = require("./Routes");
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});
// Port (use different from frontend)
const port = process.env.PORT || 3000;
const orderRoutes = require("./Routes/order.routes");

app.use("/api/order", orderRoutes);

const vehicleRoutes = require("./Routes/vehicle.routes");
app.use("/api/vehicle", vehicleRoutes);


const serviceRoutes = require("./Routes/service.routes");

app.use("/api", serviceRoutes);
// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

// Export
module.exports = app;