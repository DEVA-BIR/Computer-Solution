const deviceService = require("../Services/device.service");

// CREATE device
async function createdevice(req, res) {

  try {

    console.log("REQ BODY:", req.body);

    const device =
      await deviceService.createdevice(req.body);

    if (!device) {

      return res.status(400).json({
        success: false,
        error: "device not added",
      });

    }

    res.status(201).json({
      success: true,
      message: "device added successfully",
    });

  } catch (error) {

    console.log("Create device Controller Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// GET deviceS BY CUSTOMER
async function getdevicesByCustomer(req, res) {

  try {

    const { customer_id } = req.params;

    const devices =
      await deviceService.getdevicesByCustomer(customer_id);

    res.status(200).json({
      success: true,
      data: devices,
    });

  } catch (error) {

    console.log("Get devices Controller Error:", error);

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}
async function deletedevice(req, res) {
  try {
    const deviceId = req.params.id;

    if (!deviceId) {
      return res.status(400).json({
        success: false,
        message: "deviceId is missing",
      });
    }

    await deviceService.deletedevice(deviceId);

    res.status(200).json({
      success: true,
      message: "device deleted successfully",
    });

  } catch (error) {
    console.error("DELETE device ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
module.exports = {
  createdevice,
  getdevicesByCustomer,
  deletedevice,
};