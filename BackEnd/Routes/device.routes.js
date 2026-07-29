const express = require("express");
const router = express.Router();

const deviceController = require("../Controllers/device.controller");
router.get("/:customer_id", deviceController.getdevicesByCustomer);
router.delete("/:id", deviceController.deletedevice);

router.post("/", deviceController.createdevice);

module.exports = router;