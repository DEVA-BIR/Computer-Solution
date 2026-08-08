const conn = require("../Config/dbconfig");

// =====================================================
// CHECK IF CUSTOMER EXISTS
// =====================================================
async function checkIfCustomerExists(email) {

  const query = `
    SELECT customer_id
    FROM customer_identifier
    WHERE customer_email = ?
  `;

  const rows = await conn.query(query, [email]);

  return rows.length > 0;
}

// =====================================================
// CREATE CUSTOMER
// =====================================================
async function createCustomer(customer) {
  try {

    // ==========================================
    // 1. GENERATE CUSTOMER ID
    // ==========================================

    const customerIdResult = await conn.query(`
      SELECT COALESCE(MAX(customer_id), 0) + 1 AS nextCustomerId
      FROM customer_identifier
    `);

    const customer_id =
      customerIdResult[0].nextCustomerId;


    // ==========================================
    // 2. INSERT CUSTOMER IDENTIFIER
    // ==========================================

    await conn.query(
      `
      INSERT INTO customer_identifier (
        customer_id,
        customer_email,
        customer_phone_number,
        customer_hash
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        customer_id,
        customer.customer_email,
        customer.customer_phone,
        "default_hash"
      ]
    );


    // ==========================================
    // 3. GENERATE CUSTOMER INFO ID
    // ==========================================

    const infoIdResult = await conn.query(`
      SELECT COALESCE(MAX(customer_info_id), 0) + 1 AS nextCustomerInfoId
      FROM customer_info
    `);

    const customer_info_id =
      infoIdResult[0].nextCustomerInfoId;


    // ==========================================
    // 4. INSERT CUSTOMER INFO
    // ==========================================

    await conn.query(
      `
      INSERT INTO customer_info (
        customer_info_id,
        customer_id,
        customer_first_name,
        customer_last_name,
        active_customer_status
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        customer_info_id,
        customer_id,
        customer.customer_first_name,
        customer.customer_last_name,
        1
      ]
    );


    return customer_id;

  } catch (error) {

    console.log("Create Customer Service Error:", error);

    throw error;
  }
}
// =====================================================
// GET CUSTOMER BY EMAIL
// =====================================================
async function getCustomerByEmail(customer_email) {

  const query = `
    SELECT
      ci.customer_id,
      ci.customer_email,
      ci.customer_phone_number,
      ci.customer_added_date,
      ci.customer_hash,

      c.customer_first_name,
      c.customer_last_name,
      c.active_customer_status

    FROM customer_identifier ci

    INNER JOIN customer_info c
      ON ci.customer_id = c.customer_id

    WHERE ci.customer_email = ?
  `;

  return await conn.query(query, [customer_email]);
}

// =====================================================
// GET ALL CUSTOMERS
// =====================================================
async function getAllCustomers() {

  const query = `
    SELECT
      ci.customer_id,
      ci.customer_first_name,
      ci.customer_last_name,
      c.customer_email,
      c.customer_phone_number,
      c.customer_added_date,
      c.active_customer_status

    FROM customer_info ci

    LEFT JOIN customer_identifier c
      ON ci.customer_id = c.customer_id

    ORDER BY ci.customer_id DESC
  `;

  return await conn.query(query);
}

// =====================================================
// UPDATE CUSTOMER
// =====================================================
async function updateCustomer(customerId, customer) {

  await conn.query(
    `
    UPDATE customer_info
    SET
      customer_first_name = ?,
      customer_last_name = ?,
      active_customer_status = ?
    WHERE customer_id = ?
    `,
    [
      customer.firstName,
      customer.lastName,
      customer.active ? 1 : 0,
      customerId,
    ]
  );

  await conn.query(
    `
    UPDATE customer_identifier
    SET customer_phone_number = ?
    WHERE customer_id = ?
    `,
    [
      customer.phone,
      customerId,
    ]
  );

  return true;
}

// =====================================================
// DELETE CUSTOMER
// =====================================================
async function deleteCustomer(customerId) {

  try {

    // Delete devices first because they reference customer
    await conn.query(
      `
      DELETE FROM customer_device_info
      WHERE customer_id = ?
      `,
      [customerId]
    );

    // Delete customer info
    await conn.query(
      `
      DELETE FROM customer_info
      WHERE customer_id = ?
      `,
      [customerId]
    );

    // Delete customer identifier
    await conn.query(
      `
      DELETE FROM customer_identifier
      WHERE customer_id = ?
      `,
      [customerId]
    );

    return true;

  } catch (error) {

    console.log("DELETE CUSTOMER ERROR:", error);

    throw error;
  }
}

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};
