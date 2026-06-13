import React, { useState } from "react";
import orderService from "../../../../Services/order.service.jsx";
import { useNavigate } from "react-router-dom";
function AddOrder() {
  const api_url = import.meta.env.VITE_API_URL;;
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employee_id: "",
    customer_id: "",
    vehicle_id: "",

    active_order: 1,

    order_total_price: "",

    estimated_completion_date: "",

    completion_date: "",

    additional_request: "",

    notes_for_internal_use: "",

    notes_for_customer: "",

    additional_requests_completed: 0,

    order_status: 1,

    services: [
      {
        service_id: "",
        service_completed: 0,
      },
    ],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (index, e) => {
    const values = [...formData.services];

    values[index][e.target.name] = e.target.value;

    setFormData({
      ...formData,
      services: values,
    });
  };

  const addServiceField = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        {
          service_id: "",
          service_completed: 0,
        },
      ],
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // clear old messages
  setSuccess("");
  setError("");

  try {

    const response = await fetch(`${api_url}/api/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // SUCCESS
    if (response.ok) {

      setSuccess("Order added successfully");

      setError("");

      console.log(data);

      // optional form reset
      setFormData({
        employee_id: "",
        customer_id: "",
        vehicle_id: "",
        services: [],
      });
         navigate("/");
    } else {

      // BACKEND ERROR
      setError(data.message || "Failed to add order");

      setSuccess("");
    }

  } catch (error) {

    console.error("Add Order Error:", error);

    setError("Server error");

    setSuccess("");
  }
};

  return (
    <div className="container mt-4">
      <h2>Add Order</h2>
       {success && (
  <div className="alert alert-success">
    {success}
  </div>
)}

{error && (
  <div className="alert alert-danger">
    {error}
  </div>
)}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Employee ID</label>

          <input
            type="number"
            name="employee_id"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Customer ID</label>

          <input
            type="number"
            name="customer_id"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Vehicle ID</label>

          <input
            type="number"
            name="vehicle_id"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Total Price</label>

          <input
            type="number"
            name="order_total_price"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Estimated Completion Date</label>

          <input
            type="datetime-local"
            name="estimated_completion_date"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Additional Request</label>

          <textarea
            name="additional_request"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Notes For Internal Use</label>

          <textarea
            name="notes_for_internal_use"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Notes For Customer</label>

          <textarea
            name="notes_for_customer"
            className="form-control"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Order Status</label>

          <select
            name="order_status"
            className="form-control"
            onChange={handleChange}
          >
            <option value="1">Pending</option>
            <option value="2">In Progress</option>
            <option value="3">Completed</option>
          </select>
        </div>

        <h4>Services</h4>

        {formData.services.map((service, index) => (
          <div key={index} className="border p-3 mb-3">
            <div className="mb-3">
              <label>Service ID</label>

              <input
                type="number"
                name="service_id"
                className="form-control"
                onChange={(e) =>
                  handleServiceChange(index, e)
                }
              />
            </div>

            <div className="mb-3">
              <label>Service Completed</label>

              <select
                name="service_completed"
                className="form-control"
                onChange={(e) =>
                  handleServiceChange(index, e)
                }
              >
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-secondary mb-3"
          onClick={addServiceField}
        >
          Add More Service
        </button>

        <br />

        <button type="submit" className="btn btn-primary" type="submit">
          Create Order
        </button>
      </form>
    </div>
  );
}

export default AddOrder;