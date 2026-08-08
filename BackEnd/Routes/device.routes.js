const express = require("express");
const router = express.Router();

const deviceController = require("../Controllers/device.controller");

// Create
router.post("/", deviceController.createdevice);

// Get single device
router.get("/single/:id", deviceController.getSingleDevice);

// Get devices by customer
router.get("/customer/:customer_id", deviceController.getdevicesByCustomer);

// Update
router.put("/:id", deviceController.updateDevice);

// Delete
router.delete("/:id", deviceController.deletedevice);

module.exports = router;
