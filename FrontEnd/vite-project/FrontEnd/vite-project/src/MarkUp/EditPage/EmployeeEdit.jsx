import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import employeeService from "../../Services/employee.service.jsx";
import { useAuth } from "../../Context/AuthContxt.jsx";

const EditEmployee = () => {
  const { state } = useLocation();
  const employee = state;

  const navigate = useNavigate();
  const { employee: authUser } = useAuth();
  const token = authUser?.employee_token;

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: employee?.employee_first_name || "",
    lastName: employee?.employee_last_name || "",
    phone: employee?.employee_phone || "",
    role: employee?.company_role_name?.toUpperCase() || "",
    active: employee?.active_employee || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await employeeService.updateEmployee(
        employee.employee_id,
        formData,
        token
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage(data.message || "Employee updated successfully");
        setErrorMessage(null);

        setTimeout(() => {
          navigate("/Admin/employees");
        }, 1500);
      } else {
        setErrorMessage(data.error || "Update failed");
        setSuccessMessage(null);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage("Server error during update");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="admin-edit-container">
      <h2>
        Edit: {employee?.employee_first_name} {employee?.employee_last_name}
      </h2>

      <p>{employee?.employee_email}</p>

      {successMessage && (
        <div className="admin-success" style={{ marginBottom: 10 }}>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="admin-error" style={{ marginBottom: 10 }}>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="First Name"
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Last Name"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control mb-2"
          placeholder="Phone"
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="form-control mb-2"
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
          />
          <label style={{ marginLeft: "8px" }}>
            Active Employee
          </label>
        </div>

        <button className="btn btn-primary">
          UPDATE
        </button>
        <button
          type="button"
          className="btn btn-secondary cancel"
          onClick={() => navigate("/admin/employees")}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;