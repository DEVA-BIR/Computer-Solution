const express = require("express");
const router = express.Router();

const orderController = require("../Controllers/order.controller");

// CREATE ORDER
router.post("/", orderController.createOrder);

// GET ALL ORDERS
router.get("/", orderController.getAllOrders);

// GET SINGLE ORDER
router.get("/:id", orderController.getSingleOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);

module.exports = router;