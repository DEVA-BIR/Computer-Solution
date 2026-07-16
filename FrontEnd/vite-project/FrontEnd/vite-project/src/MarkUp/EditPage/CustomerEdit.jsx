import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import customerService from "../../Services/customer.service";
import { useAuth } from "../../Context/AuthContxt.jsx";

const EditCustomer = () => {
  const { state } = useLocation();
  const customer = state;

  const navigate = useNavigate();
  const { employee } = useAuth();

  const token = employee?.employee_token;

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [formData, setFormData] = useState({
    firstName: customer?.customer_first_name || "",
    lastName: customer?.customer_last_name || "",
    phone: customer?.customer_phone_number || "",
    active: customer?.active_customer_status || false,
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
      const response = await customerService.updateCustomer(
        customer.customer_id,
        formData,
        token
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Updated successfully");
        setErrorMessage(null);

        setTimeout(() => {
          navigate("/admin/customers");
        }, 1500);
      } else {
        setErrorMessage(data.error);
        setSuccessMessage(null);
      }
    } catch (error) {
      setErrorMessage("Update failed");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="admin-edit-container">
      <h2>
        Edit: {customer?.customer_first_name}{" "}
        {customer?.customer_last_name}
      </h2>

      <p>{customer?.customer_email}</p>

      {successMessage && (
        <div className="admin-success">{successMessage}</div>
      )}

      {errorMessage && (
        <div className="admin-error">{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="form-control mb-2"
        />

        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="form-check-input"
          />
          <label>Active</label>
        </div>

        <button className="btn btn-primary">
          UPDATE
        </button>
        <button
          type="button"
          className="btn btn-secondary cancel"
          onClick={() => navigate("/admin/customers")}
        >
          CANCEL
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;