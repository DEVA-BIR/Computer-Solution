import React, { useState } from "react";


const AddVehicle = () => {

  // CUSTOMER STATE
  const [customer, setCustomer] = useState({
    name: "Dawit Birhanu",
    email: "test@takeoff.com",
    phone: "205689034",
  });

  // EDIT MODE
  const [isEditing, setIsEditing] = useState(false);

  // VEHICLE FORM STATE
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

  // VEHICLE LIST
  const [vehicles, setVehicles] = useState([]);

  // HANDLE CUSTOMER INPUT
  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  // SAVE CUSTOMER INFO
  const handleSave = () => {
    setIsEditing(false);
  };

  // HANDLE VEHICLE INPUT
  const handleVehicleChange = (e) => {
    setVehicle({
      ...vehicle,
      [e.target.name]: e.target.value,
    });
  };

  // ADD VEHICLE
  const handleSubmit = (e) => {
    e.preventDefault();

    setVehicles([...vehicles, vehicle]);

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
  };

  return (
    <div className="customer-page">

      {/* INFO SECTION */}
      <div className="section-row">

        <div className="circle-box">
          Info
        </div>

        <div className="section-content">

          <h2>
            Customer: {customer.name}
          </h2>

          {isEditing ? (
            <div className="edit-form">

              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleCustomerChange}
                placeholder="Customer Name"
              />

              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleCustomerChange}
                placeholder="Customer Email"
              />

              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleCustomerChange}
                placeholder="Phone Number"
              />

              <button onClick={handleSave}>
                Save
              </button>

            </div>
          ) : (
            <div>

              <p>
                <strong>Email:</strong> {customer.email}
              </p>

              <p>
                <strong>Phone Number:</strong> {customer.phone}
              </p>

              <p>
                <strong>Active Customer:</strong> Yes
              </p>

              <span
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Edit customer info ✏️
              </span>

            </div>
          )}

        </div>

      </div>

      {/* VEHICLE SECTION */}
      <div className="section-row">

        <div className="circle-box">
          Cars
        </div>

        <div className="section-content">

          <h2>
            Vehicles of {customer.name.split(" ")[0]}
          </h2>

          {/* VEHICLE DISPLAY */}
          <div className="vehicle-display">

            {vehicles.length === 0 ? (
              <p>No vehicle found</p>
            ) : (
              vehicles.map((car, index) => (
                <div className="vehicle-card" key={index}>

                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>

                  <p>
                    <strong>Type:</strong> {car.type}
                  </p>

                  <p>
                    <strong>Mileage:</strong> {car.mileage}
                  </p>

                  <p>
                    <strong>Tag:</strong> {car.tag}
                  </p>

                  <p>
                    <strong>Serial:</strong> {car.serial}
                  </p>

                  <p>
                    <strong>Color:</strong> {car.color}
                  </p>

                </div>
              ))
            )}

          </div>

          {/* ADD VEHICLE FORM */}
          <div className="vehicle-form-container">

            <h2>Add a new vehicle</h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="year"
                placeholder="Vehicle year"
                value={vehicle.year}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="make"
                placeholder="Vehicle make"
                value={vehicle.make}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="model"
                placeholder="Vehicle model"
                value={vehicle.model}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="type"
                placeholder="Vehicle type"
                value={vehicle.type}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="mileage"
                placeholder="Vehicle mileage"
                value={vehicle.mileage}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="tag"
                placeholder="Vehicle tag"
                value={vehicle.tag}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="serial"
                placeholder="Vehicle serial"
                value={vehicle.serial}
                onChange={handleVehicleChange}
              />

              <input
                type="text"
                name="color"
                placeholder="Vehicle color"
                value={vehicle.color}
                onChange={handleVehicleChange}
              />

              <button type="submit">
                ADD VEHICLE
              </button>

            </form>

          </div>

        </div>

      </div>

      {/* ORDERS SECTION */}
      <div className="section-row">

        <div className="circle-box">
          Orders
        </div>

        <div className="section-content">

          <h2>
            Orders of {customer.name.split(" ")[0]}
          </h2>

          <p>Orders will be displayed here</p>

        </div>

      </div>

    </div>
  );
};

export default AddVehicle;


