const express = require("express");
const router = express.Router();

const customerController = require("../Controllers/customer.controller");

// ✅ REMOVE /customers from all routes

router.post("/", customerController.createCustomer);
router.get("/", customerController.getAllCustomers);
router.put("/:id", customerController.updateCustomer);
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;