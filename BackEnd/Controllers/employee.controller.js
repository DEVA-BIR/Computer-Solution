// Import the employee service 
const employeeService = require('../Services/employee.service');

// Create employee
async function createEmployee(req, res) {
  try {
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );

    if (employeeExists) {
      return res.status(400).json({
        error: "This email address is already associated with another employee!"
      });
    }

    const employee = await employeeService.createEmployee(req.body);

    if (!employee) {
      return res.status(400).json({
        error: "Failed to add the employee!"
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Employee created successfully"
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong!"
    });
  }
}


// Get all employees
async function getAllEmployees(req, res) {
  try {
    const employees = await employeeService.getAllEmployees();

    if (!employees) {
      return res.status(400).json({
        error: "Failed to get all employees!"
      });
    }

    return res.status(200).json({
      status: "success",
      data: employees
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Something went wrong!"
    });
  }
}


// ✅ FIXED: Update Employee (NOW SUPPORTS ROLE)
async function updateEmployee(req, res) {
  try {
    const employeeId = req.params.id;

    const updated = await employeeService.updateEmployee(
      employeeId,
      req.body
    );

    if (!updated) {
      return res.status(400).json({
        error: "Failed to update employee"
      });
    }

    return res.status(200).json({
      message: "Employee updated successfully"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Update failed"
    });
  }
}


// DELETE EMPLOYEE
async function deleteEmployee(req, res) {
  try {
    const employeeId = req.params.id;

    await employeeService.deleteEmployee(employeeId);

    return res.status(200).json({
      message: "Employee deleted successfully"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      error: "Delete failed"
    });
  }
}


// Export controllers
module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee
};