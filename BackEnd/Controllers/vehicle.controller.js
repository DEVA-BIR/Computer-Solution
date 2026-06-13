const vehicleService = require("../Services/vehicle.service");

// CREATE VEHICLE
async function createVehicle(req, res) {

  try {

    console.log("REQ BODY:", req.body);

    const vehicle =
      await vehicleService.createVehicle(req.body);

    if (!vehicle) {

      return res.status(400).json({
        success: false,
        error: "Vehicle not added",
      });

    }

    res.status(201).json({
      success: true,
      message: "Vehicle added successfully",
    });

  } catch (error) {

    console.log("Create Vehicle Controller Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// GET VEHICLES BY CUSTOMER
async function getVehiclesByCustomer(req, res) {

  try {

    const { customer_id } = req.params;

    const vehicles =
      await vehicleService.getVehiclesByCustomer(customer_id);

    res.status(200).json({
      success: true,
      data: vehicles,
    });

  } catch (error) {

    console.log("Get Vehicles Controller Error:", error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}
async function deleteVehicle(req, res) {
  try {
    const vehicleId = req.params.id;

    if (!vehicleId) {
      return res.status(400).json({
        success: false,
        message: "vehicleId is missing",
      });
    }

    await vehicleService.deleteVehicle(vehicleId);

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });

  } catch (error) {
    console.error("DELETE VEHICLE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
module.exports = {
  createVehicle,
  getVehiclesByCustomer,
  deleteVehicle,
};