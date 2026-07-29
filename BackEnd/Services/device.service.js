const conn = require("../Config/dbconfig");

// CREATE device
async function createdevice(deviceData) {
  try {
    const {
      customer_id,
      device_year,
      device_make,
      device_model,
      device_type,
      device_accessories_received,
      device_brand,
      device_serial,
      device_problem,
    } = deviceData;

    // Required field validation
    if (!device_year)
      throw new Error("Year is required");

    if (!device_make)
      throw new Error("Make is required");

    if (!device_model)
      throw new Error("Model is required");

    if (!device_type)
      throw new Error("Type is required");

    if (!device_accessories_received)
      throw new Error("accessorie is required");

    if (!device_brand)
      throw new Error("Brand is required");

    if (!device_serial)
      throw new Error("Serial is required");

    if (!device_problem)
      throw new Error("Problem is required");

    // Check duplicate serial
    const serialExists = await conn.query(
      `SELECT device_id
       FROM customer_device_info
       WHERE device_serial = ?`,
      [device_serial]
    );

    if (serialExists.length > 0) {
      throw new Error("Serial already exists");
    }

    // Check duplicate brand
    const brandExists = await conn.query(
      `SELECT device_id
       FROM customer_device_info
       WHERE device_brand = ?`,
      [device_brand]
    );

    if (brandExists.length > 0) {
      throw new Error("brand already exists");
    }

    const query = `
      INSERT INTO customer_device_info (
        customer_id,
        device_year,
        device_make,
        device_model,
        device_type,
        device_accessories_received,
       device_brand,
        device_serial,
        device_problem
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return await conn.query(query, [
      customer_id,
      device_year,
      device_make,
      device_model,
      device_type,
      device_accessories_received,
      device_brand,
      device_serial,
      device_problem,
    ]);

  } catch (error) {
    throw error;
  }
}
// GET deviceS BY CUSTOMER
async function getdevicesByCustomer(customer_id) {

  try {

    const query = `
      SELECT *
      FROM customer_device_info
      WHERE customer_id = ?
      ORDER BY device_id DESC
    `;

    const rows = await conn.query(query, [customer_id]);

    return rows;

  } catch (error) {

    console.log("Get devices Service Error:", error);

    throw error;
  }
}
async function deletedevice(deviceId) {
  try {
    // 1. delete dependent orders first
    await conn.query(
      "DELETE FROM orders WHERE device_id = ?",
      [deviceId]
    );

    // 2. delete device
    const query = `
      DELETE FROM customer_device_info
      WHERE device_id = ?
    `;

    return await conn.query(query, [deviceId]);

  } catch (error) {
    console.log(error);
    throw error;
  }
}
module.exports = {
  createdevice,
  getdevicesByCustomer,
  deletedevice,
};