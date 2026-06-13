const conn = require("../Config/dbconfig");

// CREATE VEHICLE
async function createVehicle(vehicleData) {
  try {
    const {
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    } = vehicleData;

    // Required field validation
    if (!vehicle_year)
      throw new Error("Year is required");

    if (!vehicle_make)
      throw new Error("Make is required");

    if (!vehicle_model)
      throw new Error("Model is required");

    if (!vehicle_type)
      throw new Error("Type is required");

    if (!vehicle_mileage)
      throw new Error("Mileage is required");

    if (!vehicle_tag)
      throw new Error("Tag is required");

    if (!vehicle_serial)
      throw new Error("Serial is required");

    if (!vehicle_color)
      throw new Error("Color is required");

    // Check duplicate serial
    const serialExists = await conn.query(
      `SELECT vehicle_id
       FROM customer_vehicle_info
       WHERE vehicle_serial = ?`,
      [vehicle_serial]
    );

    if (serialExists.length > 0) {
      throw new Error("Serial already exists");
    }

    // Check duplicate tag
    const tagExists = await conn.query(
      `SELECT vehicle_id
       FROM customer_vehicle_info
       WHERE vehicle_tag = ?`,
      [vehicle_tag]
    );

    if (tagExists.length > 0) {
      throw new Error("Tag already exists");
    }

    const query = `
      INSERT INTO customer_vehicle_info (
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return await conn.query(query, [
      customer_id,
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    ]);

  } catch (error) {
    throw error;
  }
}
// GET VEHICLES BY CUSTOMER
async function getVehiclesByCustomer(customer_id) {

  try {

    const query = `
      SELECT *
      FROM customer_vehicle_info
      WHERE customer_id = ?
      ORDER BY vehicle_id DESC
    `;

    const rows = await conn.query(query, [customer_id]);

    return rows;

  } catch (error) {

    console.log("Get Vehicles Service Error:", error);

    throw error;
  }
}
async function deleteVehicle(vehicleId) {
  try {
    // 1. delete dependent orders first
    await conn.query(
      "DELETE FROM orders WHERE vehicle_id = ?",
      [vehicleId]
    );

    // 2. delete vehicle
    const query = `
      DELETE FROM customer_vehicle_info
      WHERE vehicle_id = ?
    `;

    return await conn.query(query, [vehicleId]);

  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  createVehicle,
  getVehiclesByCustomer,
  deleteVehicle,
};