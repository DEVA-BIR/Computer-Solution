const express = require("express");

const router = express.Router();

const serviceController =
  require("../Controllers/service.controller");

// CREATE SERVICE
router.post(
  "/service",
  serviceController.createService
);

// GET ALL SERVICES
router.get(
  "/service",
  serviceController.getAllServices
);

// UPDATE SERVICE
router.put(
  "/service/:service_id",
  serviceController.updateService
);

// DELETE SERVICE
router.delete(
  "/service/:service_id",
  serviceController.deleteService
);

module.exports = router;