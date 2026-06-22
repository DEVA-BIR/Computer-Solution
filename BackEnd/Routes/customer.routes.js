const express = require("express");
const router = express.Router();

const customerController = require("../Controllers/customer.controller");

// ✅ DO NOT repeat /customers here
router.post("/customers", customerController.createCustomer);
router.get("/customers", customerController.getAllCustomers);
router.put("/customers/:id", customerController.updateCustomer);
router.delete("/customers/:id", customerController.deleteCustomer);

module.exports = router;