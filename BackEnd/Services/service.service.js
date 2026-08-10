const conn = require("../Config/dbconfig");

// =====================================================
// CREATE SERVICE
// =====================================================
async function createService(serviceData) {
  try {
    const {
      service_name,
      service_description,
    } = serviceData;

    // =================================================
    // VALIDATE SERVICE NAME
    // =================================================
    if (!service_name || service_name.trim() === "") {
      throw new Error("Service name is required");
    }

    // =================================================
    // GENERATE SERVICE ID MANUALLY
    // =================================================
    const idResult = await conn.query(`
      SELECT COALESCE(MAX(service_id), 0) + 1 AS nextServiceId
      FROM common_services
    `);

    const service_id = Number(
      idResult[0].nextServiceId
    );

    console.log("Generated Service ID:", service_id);

    // =================================================
    // INSERT SERVICE
    // =================================================
    const query = `
      INSERT INTO common_services (
        service_id,
        service_name,
        service_description
      )
      VALUES (?, ?, ?)
    `;

    const result = await conn.query(query, [
      service_id,
      service_name.trim(),
      service_description || null,
    ]);

    console.log("Service created:", result);

    return {
      success: true,
      service_id: service_id,
      service_name: service_name.trim(),
      service_description: service_description || null,
    };

  } catch (error) {
    console.error("Create Service Error:", error);
    throw error;
  }
};


// =====================================================
// GET ALL SERVICES
// =====================================================
async function getAllServices() {
  try {

    const query = `
      SELECT
        service_id,
        service_name,
        service_description
      FROM common_services
      ORDER BY service_id DESC
    `;

    const rows = await conn.query(query);

    return rows;

  } catch (error) {

    console.error("Get Services Error:", error);

    throw error;
  }
};


// =====================================================
// UPDATE SERVICE
// =====================================================
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
      service_description || null,
      service_id,
    ]);

    return result;

  } catch (error) {

    console.error("Update Service Error:", error);

    throw error;
  }
};


// =====================================================
// DELETE SERVICE
// =====================================================
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

    console.error("Delete Service Error:", error);

    throw error;
  }
};


// =====================================================
// EXPORT
// =====================================================
module.exports = {
  createService,
  getAllServices,
  updateService,
  deleteService,
};
