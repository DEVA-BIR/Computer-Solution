// Import the query function from the db.config.js file 
const conn = require("../Config/dbconfig");
// Import the bcrypt module 
const bcrypt = require('bcrypt');


// CHECK IF EMPLOYEE EXISTS
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);

  if (rows.length > 0) {
    return true;
  }
  return false;
}


// CREATE EMPLOYEE
async function createEmployee(employee) {
  let createdEmployee = {};

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    const query = "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await conn.query(query, [
      employee.employee_email,
      employee.active_employee
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }

    const employee_id = rows.insertId;

    await conn.query(
      `INSERT INTO employee_info 
       (employee_id, employee_first_name, employee_last_name, employee_phone) 
       VALUES (?, ?, ?, ?)`,
      [
        employee_id,
        employee.employee_first_name,
        employee.employee_last_name,
        employee.employee_phone
      ]
    );

    await conn.query(
      `INSERT INTO employee_pass 
       (employee_id, employee_password_hashed) 
       VALUES (?, ?)`,
      [employee_id, hashedPassword]
    );

    await conn.query(
      `INSERT INTO employee_role 
       (employee_id, company_role_id) 
       VALUES (?, ?)`,
      [employee_id, employee.company_role_id || 3]
    );

    createdEmployee = { employee_id };

    return createdEmployee;

  } catch (err) {
    console.log(err);
    return false;
  }
}


// GET EMPLOYEE BY EMAIL
async function getEmployeeByEmail(employee_email) {
  const query = `
    SELECT * 
    FROM employee 
    INNER JOIN employee_info 
      ON employee.employee_id = employee_info.employee_id 
    INNER JOIN employee_pass 
      ON employee.employee_id = employee_pass.employee_id 
    INNER JOIN employee_role 
      ON employee.employee_id = employee_role.employee_id 
    WHERE employee.employee_email = ?
  `;

  return await conn.query(query, [employee_email]);
}


// GET ALL EMPLOYEES
async function getAllEmployees() {
  const query = `
    SELECT * 
    FROM employee 
    INNER JOIN employee_info 
      ON employee.employee_id = employee_info.employee_id 
    INNER JOIN employee_role 
      ON employee.employee_id = employee_role.employee_id 
    INNER JOIN company_roles 
      ON employee_role.company_role_id = company_roles.company_role_id 
    ORDER BY employee.employee_id DESC
  `;

  return await conn.query(query);
}


// UPDATE EMPLOYEE (ROLE FIXED HERE)
async function updateEmployee(employeeId, employee) {

  // update info
  await conn.query(
    `UPDATE employee_info
     SET
       employee_first_name = ?,
       employee_last_name = ?,
       employee_phone = ?
     WHERE employee_id = ?`,
    [
      employee.firstName,
      employee.lastName,
      employee.phone,
      employeeId
    ]
  );

  // update active
  await conn.query(
    `UPDATE employee
     SET active_employee = ?
     WHERE employee_id = ?`,
    [
      employee.active ? 1 : 0,
      employeeId
    ]
  );

  // 🔥 UPDATE ROLE (IMPORTANT FIX)
  let roleId = 1; // EMPLOYEE default

  if (employee.role === "Admin") roleId = 3;
  else if (employee.role === "Manager") roleId = 2;

  await conn.query(
    `UPDATE employee_role
     SET company_role_id = ?
     WHERE employee_id = ?`,
    [roleId, employeeId]
  );

  return true;
}


// DELETE EMPLOYEE
async function deleteEmployee(employeeId) {

  await conn.query(
    "DELETE FROM employee_pass WHERE employee_id=?",
    [employeeId]
  );

  await conn.query(
    "DELETE FROM employee_role WHERE employee_id=?",
    [employeeId]
  );

  await conn.query(
    "DELETE FROM employee_info WHERE employee_id=?",
    [employeeId]
  );

  await conn.query(
    "DELETE FROM employee WHERE employee_id=?",
    [employeeId]
  );

  return true;
}


// EXPORT
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};