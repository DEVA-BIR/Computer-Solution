import React, { useState, useEffect } from "react";
import deviceService from "../../../../Services/device.service";
import { useLocation,useNavigate } from "react-router-dom";

const AddDevice = () => {
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
  const navigate = useNavigate();
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

  const [device, setdevice] = useState({
    year: "",
    make: "",
    model: "",
    type: "",
    accessories_received: "",
    brand: "",
    serial: "",
    problem: "",
  });

  const [devices, setdevices] = useState([]);

  useEffect(() => {
    const loaddevices = async () => {
      if (!customer_id) return;

      try {
        const res = await deviceService.getdevicesByCustomer(customer_id);

        const deviceArray =
          Array.isArray(res)
            ? res
            : Array.isArray(res.data)
            ? res.data
            : Array.isArray(res.data?.data)
            ? res.data.data
            : [];

        setdevices(deviceArray);
      } catch (error) {
        console.log("Load device Error:", error);
        setdevices([]);
      }
    };

    loaddevices();
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

  const handledeviceChange = (e) => {
    setdevice({
      ...device,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!device.year)
  return setFieldError("Year is required");

if (!device.make)
  return setFieldError("Make is required");

if (!device.model)
  return setFieldError("Model is required");

if (!device.type)
  return setFieldError("Type is required");

if (!device.accessories_received)
  return setFieldError("accessories_received is required");

if (!device.brand)
  return setFieldError("brand is required");

if (!device.serial)
  return setFieldError("Serial is required");

if (!device.problem)
  return setFieldError("problem is required");

setFieldError("");

    try {
      const deviceData = {
        customer_id: customer_id,
        device_year: Number(device.year),
        device_make: device.make,
        device_model: device.model,
        device_type: device.type,
        device_accessories_received: device.accessories_received,
        device_brand: device.brand,
        device_serial: device.serial,
        device_problem: device.problem,
      };

      await deviceService.adddevice(deviceData);

      setdevices((prev) => [...prev, deviceData]);

      setdevice({
        year: "",
        make: "",
        model: "",
        type: "",
        accessories_received: "",
        brand: "",
        serial: "",
        problem: "",
      });

      setMessage("device added successfully");
      setMessageType("success");
    } catch (error) {
      console.log("Add device Error:", error);
      setFieldError(error.message);

      setMessage(error.message);
      setMessageType("error");
    }
  };
const handleDeletedevice = async (deviceId) => {
  try {
    console.log("Deleting ID:", deviceId);

    const res = await deviceService.deletedevice(deviceId);

    if (res.success) {
      setdevices((prev) =>
        prev.filter((v) => v.device_id !== deviceId)
      );

      // ✅ SUCCESS MESSAGE
      setMessage("device deleted successfully");
      setMessageType("success");
    } else {
      // ❌ BACKEND ERROR RESPONSE
      setMessage(res.message || "Failed to delete device");
      setMessageType("error");
    }

  } catch (error) {
    console.log("Delete error:", error.message);

    // ❌ NETWORK / SERVER ERROR
    setMessage("Error deleting device");
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
        <div className="circle-box">Devices</div>

        <div className="section-content">
          <h2>devices of {customer.name.split(" ")[0]}</h2>

          <div className="device-display">
            {Array.isArray(devices) && devices.length === 0 ? (
              <p>No device found</p>
            ) : (
              Array.isArray(devices) &&
              devices.map((Device, index) => (
                <div className="device-Deviced" key={index}>
  <h3>
    {Device.device_year || Device.year}{" "}
    {Device.device_make || Device.make}{" "}
    {Device.device_model || Device.model}
  </h3>
  <p><strong>Type:</strong> {Device.device_type || Device.type}</p>
  <p><strong>accessories_received:</strong> {Device.device_accessories_received || Device.accessories_received}</p>
  <p><strong>brand:</strong> {Device.device_brand || Device.brand}</p>
  <p><strong>Serial:</strong> {Device.device_serial || Device.serial}</p>
  <p><strong>problem:</strong> {Device.device_problem || Device.problem}</p>

  <button
    type="button"
    className="delete-btn"
    onClick={() => handleDeletedevice(Device.device_id)}
  >
    Delete device
  </button>
  <button
  type="button"
  className="delet-btn"
  onClick={() =>
    navigate(
      `/admin/DeviceInfo/edit/${Device.device_id}`,
      {
        state: Device
      }
    )
  }
>
  Edit Device
</button>
</div>
              ))
            )}
          </div>

          <div className="device-form-container">
            <h2>Add a new device</h2>
              {fieldError && (
  <div className="msg error">
    {fieldError}
  </div>
)}
            <form onSubmit={handleSubmit}>
              <input name="year" value={device.year}  placeholder="Year" onChange={handledeviceChange} />
              <input name="make" value={device.make} placeholder="Make" onChange={handledeviceChange} />
              <input name="model" value={device.model} placeholder="Model" onChange={handledeviceChange} />
              <input name="type" value={device.type} placeholder="Type" onChange={handledeviceChange} />
              <input name="accessories_received" value={device.accessories_received} placeholder="accessories_received" onChange={handledeviceChange} />
              <input name="brand" value={device.brand} placeholder="brand" onChange={handledeviceChange} />
              <input name="serial" value={device.serial} placeholder="Serial" onChange={handledeviceChange} />
              <input name="problem" value={device.problem} placeholder="problem"  onChange={handledeviceChange} />

              <button type="submit">ADD device</button>
              
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
          problem: #155724;
        }
        .msg.error {
          background: #f8d7da;
          problem: #721c24;
        }
      `}</style>

    </div>
  );
};

export default AddDevice;
