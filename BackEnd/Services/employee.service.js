const conn = require("../Config/dbconfig");
const bcrypt = require("bcrypt");

// =====================================================
// CHECK IF EMPLOYEE EXISTS
// =====================================================
async function checkIfEmployeeExists(email) {
  const query = `
    SELECT employee_id
    FROM employee
    WHERE employee_email = ?
  `;

  const rows = await conn.query(query, [email]);

  return rows.length > 0;
}

// =====================================================
// CREATE EMPLOYEE
// =====================================================
async function createEmployee(employee) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      employee.employee_password,
      salt
    );

    // Generate employee_id manually
    const idResult = await conn.query(`
      SELECT COALESCE(MAX(employee_id), 0) + 1 AS nextEmployeeId
      FROM employee
    `);

    const employee_id = idResult[0].nextEmployeeId;

    // 1. INSERT EMPLOYEE
    await conn.query(
      `
      INSERT INTO employee (
        employee_id,
        employee_email,
        active_employee
      )
      VALUES (?, ?, ?)
      `,
      [
        employee_id,
        employee.employee_email,
        employee.active_employee
      ]
    );

    // 2. INSERT EMPLOYEE INFO
    await conn.query(
      `
      INSERT INTO employee_info (
        employee_id,
        employee_first_name,
        employee_last_name,
        employee_phone
      )
      VALUES (?, ?, ?, ?)
      `,
      [
        employee_id,
        employee.employee_first_name,
        employee.employee_last_name,
        employee.employee_phone
      ]
    );

    // 3. INSERT PASSWORD
    await conn.query(
      `
      INSERT INTO employee_pass (
        employee_id,
        employee_password_hashed
      )
      VALUES (?, ?)
      `,
      [
        employee_id,
        hashedPassword
      ]
    );

    // 4. INSERT ROLE
    await conn.query(
      `
      INSERT INTO employee_role (
        employee_id,
        company_role_id
      )
      VALUES (?, ?)
      `,
      [
        employee_id,
        employee.company_role_id || 3
      ]
    );

    return {
      employee_id
    };

  } catch (error) {
    console.log("Create Employee Service Error:", error);
    throw error;
  }
}
// =====================================================
// GET EMPLOYEE BY EMAIL
// =====================================================
async function getEmployeeByEmail(employee_email) {
  const query = `
    SELECT
      e.employee_id,
      e.employee_email,
      e.active_employee,
      e.added_date,

      ei.employee_first_name,
      ei.employee_last_name,
      ei.employee_phone,

      ep.employee_password_hashed,

      er.company_role_id

    FROM employee e

    INNER JOIN employee_info ei
      ON e.employee_id = ei.employee_id

    INNER JOIN employee_pass ep
      ON e.employee_id = ep.employee_id

    INNER JOIN employee_role er
      ON e.employee_id = er.employee_id

    WHERE e.employee_email = ?
  `;

  return await conn.query(query, [employee_email]);
}

// =====================================================
// GET ALL EMPLOYEES
// =====================================================
async function getAllEmployees() {
  const query = `
    SELECT
      e.employee_id,
      e.employee_email,
      e.active_employee,
      e.added_date,

      ei.employee_first_name,
      ei.employee_last_name,
      ei.employee_phone,

      er.company_role_id,

      cr.company_role_name

    FROM employee e

    INNER JOIN employee_info ei
      ON e.employee_id = ei.employee_id

    INNER JOIN employee_role er
      ON e.employee_id = er.employee_id

    INNER JOIN company_roles cr
      ON er.company_role_id = cr.company_role_id

    ORDER BY e.employee_id DESC
  `;

  return await conn.query(query);
}

// =====================================================
// UPDATE EMPLOYEE
// =====================================================
async function updateEmployee(employeeId, employee) {

  await conn.query(
    `
    UPDATE employee_info
    SET
      employee_first_name = ?,
      employee_last_name = ?,
      employee_phone = ?
    WHERE employee_id = ?
    `,
    [
      employee.firstName,
      employee.lastName,
      employee.phone,
      employeeId,
    ]
  );

  await conn.query(
    `
    UPDATE employee
    SET active_employee = ?
    WHERE employee_id = ?
    `,
    [
      employee.active ? 1 : 0,
      employeeId,
    ]
  );

  // Role mapping
  let roleId = 1;

  if (employee.role === "Manager") {
    roleId = 2;
  }

  if (employee.role === "Admin") {
    roleId = 3;
  }

  await conn.query(
    `
    UPDATE employee_role
    SET company_role_id = ?
    WHERE employee_id = ?
    `,
    [
      roleId,
      employeeId,
    ]
  );

  return true;
}

// =====================================================
// DELETE EMPLOYEE
// =====================================================
async function deleteEmployee(employeeId) {

  await conn.query(
    `
    DELETE FROM employee_pass
    WHERE employee_id = ?
    `,
    [employeeId]
  );

  await conn.query(
    `
    DELETE FROM employee_role
    WHERE employee_id = ?
    `,
    [employeeId]
  );

  await conn.query(
    `
    DELETE FROM employee_info
    WHERE employee_id = ?
    `,
    [employeeId]
  );

  await conn.query(
    `
    DELETE FROM employee
    WHERE employee_id = ?
    `,
    [employeeId]
  );

  return true;
}

// =====================================================
// EXPORT
// =====================================================
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
