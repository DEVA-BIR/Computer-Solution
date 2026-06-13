const serviceService = require("../Services/service.service");

// CREATE SERVICE
async function createService(req, res) {

  try {

    console.log("REQ BODY:", req.body);

    const result =
      await serviceService.createService(req.body);

    res.status(201).json({
      success: true,
      message: "Service added successfully",
      data: result,
    });

  } catch (error) {

    console.log(
      "Create Service Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}

// GET ALL SERVICES
async function getAllServices(req, res) {

  try {

    const services =
      await serviceService.getAllServices();

    console.log("SERVICES:", services);

    res.status(200).json({
      success: true,
      data: services,
    });

  } catch (error) {

    console.log(
      "Get Services Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}

// UPDATE SERVICE
async function updateService(req, res) {

  try {

    const { service_id } = req.params;

    await serviceService.updateService(
      service_id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Service updated successfully",
    });

  } catch (error) {

    console.log(
      "Update Service Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}

// DELETE SERVICE
async function deleteService(req, res) {

  try {

    const { service_id } = req.params;

    await serviceService.deleteService(service_id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });

  } catch (error) {

    console.log(
      "Delete Service Controller Error:",
      error
    );

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
}

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};