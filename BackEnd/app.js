require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS (safe for now)
app.use(cors({ origin: "*" }));

// ✅ TEST ROUTE (fixes "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Backend is live 🚀");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
// ROUTES
app.use("/api/customers", require("./Routes/customer.routes"));
app.use("/api/orders", require("./Routes/order.routes"));
app.use("/api/vehicles", require("./Routes/vehicle.routes"));
app.use("/api/services", require("./Routes/service.routes"));
app.use("/api", require("./Routes"));

// EXPORT ONLY (IMPORTANT for Render)
module.exports = app;