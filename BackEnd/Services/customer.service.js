// Import the query function from the db.config.js file
const conn = require("../Config/dbconfig");

// Check if customer exists
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer_identifier WHERE customer_email = ?";
  const rows = await conn.query(query, [email]);

  return rows.length > 0;
}
async function createCustomer(customer) {

  const customerIdentifierQuery = `
    INSERT INTO customer_identifier
    (customer_email, customer_phone_number, customer_hash)
    VALUES (?, ?, ?)
  `;

  const identifierResult = await conn.query(
    customerIdentifierQuery,
    [
      customer.customer_email,
      customer.customer_phone,
      "default_hash"
    ]
  );

  const customer_id = identifierResult.insertId;

  const customerInfoQuery = `
    INSERT INTO customer_info
    (customer_id, customer_first_name, customer_last_name, active_customer_status)
    VALUES (?, ?, ?, ?)
  `;

  await conn.query(
    customerInfoQuery,
    [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      1
    ]
  );

  return customer_id;
}

// Get customer by email
async function getCustomerByEmail(customer_email) {
  const query = `
    SELECT * FROM customer
    INNER JOIN customer_info
    ON customer.customer_id = customer_info.customer_id
    WHERE customer.customer_email = ?
  `;

  const rows = await conn.query(query, [customer_email]);

  return rows;
}

// Get all customers
async function getAllCustomers() {
   const query = `
    SELECT 
      ci.customer_id,
      ci.customer_first_name,
      ci.customer_last_name,
      c.customer_email,
      c.customer_phone_number,
      c.customer_added_date,
      ci.active_customer_status
    FROM customer_info ci
    LEFT JOIN customer_identifier c
      ON ci.customer_id = c.customer_id
  `;

  const rows = await conn.query(query);

  return rows;
}
async function updateCustomer(customerId, customer) {
  await conn.query(
    `
      UPDATE customer_info
      SET
      customer_first_name=?,
      customer_last_name=?,
      active_customer_status=?
      WHERE customer_id=?
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
      SET customer_phone_number=?
      WHERE customer_id=?
    `,
    [
      customer.phone,
      customerId,
    ]
  );

  return true;
}
async function deleteCustomer(customerId) {

  try {

    // 1. DELETE CHILD FIRST (IMPORTANT)
    await conn.query(
      "DELETE FROM customer_info WHERE customer_id=?",
      [customerId]
    );

    // 2. THEN DELETE PARENT
    await conn.query(
      "DELETE FROM customer_identifier WHERE customer_id=?",
      [customerId]
    );

    return true;

  } catch (error) {
    console.log("DELETE ERROR:", error);
    throw error;
  }
}


// Export functions
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getCustomerByEmail,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
