const express = require('express');
// Call the router method from express to create the router 
const router = express.Router();
// Import the customer controller
const customerController = require('../Controllers/customer.controller');
// Import middleware 
const authMiddleware = require("../middlewares/Auth.middlewaree");
// Create a route to handle the add customer request on post
router.post(
  "/customers",
  customerController.createCustomer
);
router.get(
  "/customers",
  customerController.getAllCustomers
);
router.put(
  "/customers/:id",
  customerController.updateCustomer
);

router.delete(
  "/customers/:id",
  customerController.deleteCustomer
);
module.exports = router;