const express = require("express");
const router = express.Router();

const vehicleController = require("../Controllers/vehicle.controller");
router.get("/:customer_id", vehicleController.getVehiclesByCustomer);
router.delete("/:id", vehicleController.deleteVehicle);

router.post("/", vehicleController.createVehicle);

module.exports = router;