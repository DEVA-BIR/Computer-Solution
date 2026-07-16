import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import orderService from "../../Services/order.service";

const OrderEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const orderData = location.state;

  const [loading, setLoading] = useState(true);

  const [orderStatus, setOrderStatus] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleTag, setVehicleTag] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // LOAD ORDER
  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);

        let data = orderData;

        // fetch from backend if page refreshed
        if (!data && id) {
          const response = await orderService.getSingleOrder(id);

          data = response.data;
        }

        if (!data) {
          setErrorMessage("Order not found");
          return;
        }

        setOrderStatus(data.order_status || "");
        setVehicleMake(data.vehicle_make || "");
        setVehicleModel(data.vehicle_model || "");
        setVehicleYear(data.vehicle_year || "");
        setVehicleTag(data.vehicle_tag || "");

      } catch (error) {
        console.log("LOAD ERROR:", error);
        setErrorMessage("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id, orderData]);

  // UPDATE ORDER
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSuccessMessage("");
      setErrorMessage("");

      const updatedOrder = {
  order_status: orderStatus || null,
  vehicle_make: vehicleMake || null,
  vehicle_model: vehicleModel || null,
  vehicle_year:
    vehicleYear === "" || vehicleYear === undefined
      ? null
      : Number(vehicleYear),
  vehicle_tag: vehicleTag || null,
};

      const orderId = orderData?.order_id || id;

      await orderService.updateOrder(orderId, updatedOrder);

      setSuccessMessage("Order updated successfully");

      setTimeout(() => {
        navigate("/admin/order");
      }, 1000);

    } catch (error) {
      console.log("UPDATE ERROR:", error);
      setErrorMessage("Failed to update order");
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="container py-5">
        <h4>Loading order...</h4>
      </div>
    );
  }

  return (
    <div className="admin-edit-container">

      <h2 style={{ color: "#0b1c5d", fontWeight: "700" }}>
        Edit Order #{orderData?.order_id || id}
      </h2>

      {/* SUCCESS MESSAGE */}
      {successMessage && (
        <div className="alert alert-success mt-3">
          {successMessage}
        </div>
      )}

      {/* ERROR MESSAGE */}
      {errorMessage && (
        <div className="alert alert-danger mt-3">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleUpdate} className="mt-4">

        {/* ORDER STATUS */}
        <div className="mb-3">
          <label>Order Status</label>

          <select
            className="form-control"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="1">Received</option>
            <option value="2">In Progress</option>
            <option value="3">Completed</option>
          </select>
        </div>

        {/* VEHICLE MAKE */}
        <div className="mb-3">
          <label>Vehicle Make</label>

          <input
            type="text"
            className="form-control"
            value={vehicleMake}
            onChange={(e) => setVehicleMake(e.target.value)}
          />
        </div>

        {/* VEHICLE MODEL */}
        <div className="mb-3">
          <label>Vehicle Model</label>

          <input
            type="text"
            className="form-control"
            value={vehicleModel}
            onChange={(e) => setVehicleModel(e.target.value)}
          />
        </div>

        {/* VEHICLE YEAR */}
        <div className="mb-3">
          <label>Vehicle Year</label>

          <input
            type="number"
            className="form-control"
            value={vehicleYear}
            onChange={(e) => setVehicleYear(e.target.value)}
          />
        </div>

        {/* VEHICLE TAG */}
        <div className="mb-3">
          <label>Vehicle Tag</label>

          <input
            type="text"
            className="form-control"
            value={vehicleTag}
            onChange={(e) => setVehicleTag(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <button
          type="submit"
          className="btn btn-primary me-2"
        >
          UPDATE
        </button>

        <button
          type="button"
          className="btn btn-secondary cancel"
          onClick={() => navigate("/admin/order")}
        >
          CANCEL
        </button>

      </form>
    </div>
  );
};

export default OrderEdit;