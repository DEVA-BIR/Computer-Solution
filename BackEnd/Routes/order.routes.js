const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/order.controller");

// CREATE ORDER
router.post("/order", orderController.createOrder);

// GET ALL ORDERS
router.get("/order", orderController.getAllOrders);

// GET SINGLE ORDER
router.get("/order/:id", orderController.getSingleOrder);
router.put("/order/:id", orderController.updateOrder);
router.delete("/order/:id", orderController.deleteOrder);

module.exports = router;