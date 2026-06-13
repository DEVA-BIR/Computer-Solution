// Import the query function from the db.config.js file 
const conn = require("../Config/dbconfig");
// Import the bcrypt module to do the password comparison 
const bcrypt = require("bcrypt");
const employeeService = require("./employee.service");

async function logIn(employeeData) {

  try {

    console.log("LOGIN INPUT:", employeeData);

    // Get employee from DB
    const employee = await employeeService.getEmployeeByEmail(
      employeeData.employee_email
    );

    console.log("EMPLOYEE RESULT:", employee);

    // Check if employee exists
    if (!employee) {

      return {
        status: "fail",
        message: "Employee query returned undefined"
      };
    }

    // Check array length
    if (employee.length === 0) {

      return {
        status: "fail",
        message: "Employee does not exist"
      };
    }

    // First employee record
    const employeeRecord = employee[0];

    console.log("EMPLOYEE RECORD:", employeeRecord);

    // Check password hash exists
    if (!employeeRecord.employee_password_hashed) {

      return {
        status: "fail",
        message: "employee_password_hashed column missing"
      };
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(
      employeeData.employee_password,
      employeeRecord.employee_password_hashed
    );

    if (!passwordMatch) {

      return {
        status: "fail",
        message: "Incorrect password"
      };
    }

    return {
      status: "success",
      data: employeeRecord
    };

  } catch (error) {

    console.log("LOGIN ERROR:", error);

    return {
      status: "error",
      message: "Server error"
    };
  }
}

module.exports = {
  logIn
};