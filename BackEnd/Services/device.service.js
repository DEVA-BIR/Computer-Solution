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
      throw new Error("Accessorie is required");

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
      throw new Error("Brand already exists");
    }

    // Generate next device ID
    const idResult = await conn.query(
      `SELECT COALESCE(MAX(device_id), 0) + 1 AS nextDeviceId
       FROM customer_device_info`
    );

    const device_id = idResult[0].nextDeviceId;

    // Insert device
    const query = `
      INSERT INTO customer_device_info (
        device_id,
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
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    return await conn.query(query, [
      device_id,
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
    console.log("Create Device Service Error:", error);
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
async function getSingleDevice(deviceId) {

  const query = `
      SELECT *
      FROM customer_device_info
      WHERE device_id = ?
  `;

  const rows = await conn.query(query, [deviceId]);

  if (!rows || rows.length === 0) {
    return null;
  }

  return rows[0];

}
async function updateDevice(deviceId, data) {

  // Get current record
  const current = await getSingleDevice(deviceId);

  if (!current) {
    throw new Error("Device not found");
  }

  const updated = {

    device_year:
      data.device_year ?? current.device_year,

    device_make:
      data.device_make ?? current.device_make,

    device_model:
      data.device_model ?? current.device_model,

    device_type:
      data.device_type ?? current.device_type,

    device_accessories_received:
      data.device_accessories_received ??
      current.device_accessories_received,

    device_brand:
      data.device_brand ?? current.device_brand,

    device_serial:
      data.device_serial ?? current.device_serial,

    device_problem:
      data.device_problem ?? current.device_problem,

  };

  const query = `
      UPDATE customer_device_info

      SET

      device_year=?,
      device_make=?,
      device_model=?,
      device_type=?,
      device_accessories_received=?,
      device_brand=?,
      device_serial=?,
      device_problem=?

      WHERE device_id=?
  `;

  return await conn.query(query, [

    updated.device_year,

    updated.device_make,

    updated.device_model,

    updated.device_type,

    updated.device_accessories_received,

    updated.device_brand,

    updated.device_serial,

    updated.device_problem,

    deviceId

  ]);

}
module.exports = {
  createdevice,
  getdevicesByCustomer,
  deletedevice,
  getSingleDevice,
  updateDevice
};
