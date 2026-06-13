const conn = require("../Config/dbconfig");

// CREATE SERVICE
async function createService(serviceData) {

  try {

    const {
      service_name,
      service_description,
    } = serviceData;

    const query = `
      INSERT INTO common_services (
        service_name,
        service_description
      )
      VALUES (?, ?)
    `;

    const result = await conn.query(query, [
      service_name,
      service_description,
    ]);

    return result;

  } catch (error) {

    console.log("Create Service Error:", error);

    throw error;
  }
}

// GET ALL SERVICES
async function getAllServices() {

  try {

    const query = `
      SELECT *
      FROM common_services
      ORDER BY service_id DESC
    `;

    const rows = await conn.query(query);

    return rows;

  } catch (error) {

    console.log("Get Services Error:", error);

    throw error;
  }
}

// UPDATE SERVICE
async function updateService(service_id, data) {

  try {

    const {
      service_name,
      service_description,
    } = data;

    const query = `
      UPDATE common_services
      SET
        service_name = ?,
        service_description = ?
      WHERE service_id = ?
    `;

    const result = await conn.query(query, [
      service_name,
      service_description,
      service_id,
    ]);

    return result;

  } catch (error) {

    console.log("Update Service Error:", error);

    throw error;
  }
}

// DELETE SERVICE
async function deleteService(service_id) {

  try {

    const query = `
      DELETE FROM common_services
      WHERE service_id = ?
    `;

    const result = await conn.query(query, [
      service_id,
    ]);

    return result;

  } catch (error) {

    console.log("Delete Service Error:", error);

    throw error;
  }
}

module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};