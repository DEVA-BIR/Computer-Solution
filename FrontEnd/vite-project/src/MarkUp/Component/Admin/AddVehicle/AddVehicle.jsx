import React, { useState, useEffect } from "react";
import vehicleService from "../../../../Services/vehicle.service";
import { useLocation } from "react-router-dom";

const AddVehicle = () => {
  const location = useLocation();
  const selectedCustomer = location.state;

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer({
        name: `${selectedCustomer.customer_first_name} ${selectedCustomer.customer_last_name}`,
        email: selectedCustomer.customer_email,
        phone: selectedCustomer.customer_phone_number,
      });
    }
  }, [selectedCustomer]);

  const customer_id = selectedCustomer?.customer_id;

  const [isEditing, setIsEditing] = useState(false);

  const [vehicle, setVehicle] = useState({
    year: "",
    make: "",
    model: "",
    type: "",
    mileage: "",
    tag: "",
    serial: "",
    color: "",
  });

  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const loadVehicles = async () => {
      if (!customer_id) return;

      try {
        const res = await vehicleService.getVehiclesByCustomer(customer_id);

        const vehicleArray =
          Array.isArray(res)
            ? res
            : Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setVehicles(vehicleArray);
      } catch (error) {
        console.log("Load Vehicle Error:", error);
        setVehicles([]);
      }
    };

    loadVehicles();
  }, [customer_id]);

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleVehicleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!vehicle.year)
  return setFieldError("Year is required");

if (!vehicle.make)
  return setFieldError("Make is required");

if (!vehicle.model)
  return setFieldError("Model is required");

if (!vehicle.type)
  return setFieldError("Type is required");

if (!vehicle.mileage)
  return setFieldError("Mileage is required");

if (!vehicle.tag)
  return setFieldError("Tag is required");

if (!vehicle.serial)
  return setFieldError("Serial is required");

if (!vehicle.color)
  return setFieldError("Color is required");

setFieldError("");

    try {
      const vehicleData = {
        customer_id: customer_id,
        vehicle_year: Number(vehicle.year),
        vehicle_make: vehicle.make,
        vehicle_model: vehicle.model,
        vehicle_type: vehicle.type,
        vehicle_mileage: vehicle.mileage,
        vehicle_tag: vehicle.tag,
        vehicle_serial: vehicle.serial,
        vehicle_color: vehicle.color,
      };

      await vehicleService.addVehicle(vehicleData);

      setVehicles((prev) => [...prev, vehicleData]);

      setVehicle({
        year: "",
        make: "",
        model: "",
        type: "",
        mileage: "",
        tag: "",
        serial: "",
        color: "",
      });

      setMessage("Vehicle added successfully");
      setMessageType("success");
    } catch (error) {
      console.log("Add Vehicle Error:", error);
      setFieldError(error.message);

      setMessage(error.message);
      setMessageType("error");
    }
  };
const handleDeleteVehicle = async (vehicleId) => {
  try {
    console.log("Deleting ID:", vehicleId);

    const res = await vehicleService.deleteVehicle(vehicleId);

    if (res.success) {
      setVehicles((prev) =>
        prev.filter((v) => v.vehicle_id !== vehicleId)
      );

      // ✅ SUCCESS MESSAGE
      setMessage("Vehicle deleted successfully");
      setMessageType("success");
    } else {
      // ❌ BACKEND ERROR RESPONSE
      setMessage(res.message || "Failed to delete vehicle");
      setMessageType("error");
    }

  } catch (error) {
    console.log("Delete error:", error.message);

    // ❌ NETWORK / SERVER ERROR
    setMessage("Error deleting vehicle");
    setMessageType("error");
  }
};
  return (
    <div className="customer-page">

      {message && (
        <div className={`msg ${messageType}`}>
          {message}
        </div>
      )}

      <div className="section-row">
        <div className="circle-box">Info</div>

        <div className="section-content">
          <h2>Customer: {customer.name}</h2>

          {isEditing ? (
            <div className="edit-form">
              <input name="name" value={customer.name} onChange={handleCustomerChange} />
              <input name="email" value={customer.email} onChange={handleCustomerChange} />
              <input name="phone" value={customer.phone} onChange={handleCustomerChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div>
              <p><strong>Email:</strong> {customer.email}</p>
              <p><strong>Phone:</strong> {customer.phone}</p>
              <span onClick={() => setIsEditing(true)}>Edit customer info ✏️</span>
            </div>
          )}
        </div>
      </div>

      <div className="section-row">
        <div className="circle-box">Cars</div>

        <div className="section-content">
          <h2>Vehicles of {customer.name.split(" ")[0]}</h2>

          <div className="vehicle-display">
            {Array.isArray(vehicles) && vehicles.length === 0 ? (
              <p>No vehicle found</p>
            ) : (
              Array.isArray(vehicles) &&
              vehicles.map((car, index) => (
                <div className="vehicle-card" key={index}>
  <h3>
    {car.vehicle_year || car.year}{" "}
    {car.vehicle_make || car.make}{" "}
    {car.vehicle_model || car.model}
  </h3>
  <p><strong>Type:</strong> {car.vehicle_type || car.type}</p>
  <p><strong>Mileage:</strong> {car.vehicle_mileage || car.mileage}</p>
  <p><strong>Tag:</strong> {car.vehicle_tag || car.tag}</p>
  <p><strong>Serial:</strong> {car.vehicle_serial || car.serial}</p>
  <p><strong>Color:</strong> {car.vehicle_color || car.color}</p>

  <button
    type="button"
    className="delete-btn"
    onClick={() => handleDeleteVehicle(car.vehicle_id)}
  >
    Delete Vehicle
  </button>
</div>
              ))
            )}
          </div>

          <div className="vehicle-form-container">
            <h2>Add a new vehicle</h2>
              {fieldError && (
  <div className="msg error">
    {fieldError}
  </div>
)}
            <form onSubmit={handleSubmit}>
              <input name="year" value={vehicle.year}  placeholder="Year" onChange={handleVehicleChange} />
              <input name="make" value={vehicle.make} placeholder="Make" onChange={handleVehicleChange} />
              <input name="model" value={vehicle.model} placeholder="Model" onChange={handleVehicleChange} />
              <input name="type" value={vehicle.type} placeholder="Type" onChange={handleVehicleChange} />
              <input name="mileage" value={vehicle.mileage} placeholder="Mileage" onChange={handleVehicleChange} />
              <input name="tag" value={vehicle.tag} placeholder="Tag" onChange={handleVehicleChange} />
              <input name="serial" value={vehicle.serial} placeholder="Serial" onChange={handleVehicleChange} />
              <input name="color" value={vehicle.color} placeholder="Color"  onChange={handleVehicleChange} />

              <button type="submit">ADD VEHICLE</button>
              
            </form>
          </div>

        </div>
      </div>

      <style>{`
        .msg {
          padding: 10px;
          margin: 10px 0;
          border-radius: 6px;
          font-weight: 500;
        }
        .msg.success {
          background: #d4edda;
          color: #155724;
        }
        .msg.error {
          background: #f8d7da;
          color: #721c24;
        }
      `}</style>

    </div>
  );
};

export default AddVehicle;