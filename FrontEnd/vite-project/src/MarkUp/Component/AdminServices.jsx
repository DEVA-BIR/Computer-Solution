import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import serviceService from "../../Services/service.service";

const AdminServices = () => {

  // SERVICES STATE
  const [services, setServices] = useState([]);

  // FORM STATE
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  // MESSAGE STATE (ONLY ADDITION)
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await serviceService.getServices();
      setServices(res.data);
    } catch (error) {
      console.log("Load Services Error:", error);
    }
  };

  // ADD SERVICE
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!serviceName || !serviceDescription) {
        setMessage("Please fill all fields");
        setMessageType("error");
        return;
      }

      const serviceData = {
        service_name: serviceName,
        service_description: serviceDescription,
      };

      await serviceService.addService(serviceData);

      await loadServices();

      setServiceName("");
      setServiceDescription("");

      // SUCCESS MESSAGE (ONLY CHANGE)
      setMessage("Service added successfully");
      setMessageType("success");

    } catch (error) {
      console.log("Add Service Error:", error);

      // ERROR MESSAGE (ONLY CHANGE)
      setMessage("Failed to add service");
      setMessageType("error");
    }
  };

  // DELETE SERVICE
  const handleDelete = async (service_id) => {
    try {
      await serviceService.deleteService(service_id);
      await loadServices();

      // SUCCESS MESSAGE
      setMessage("Service deleted successfully");
      setMessageType("success");

    } catch (error) {
      console.log("Delete Error:", error);

      setMessage("Failed to delete service");
      setMessageType("error");
    }
  };

  // EDIT SERVICE
  const handleEdit = async (service) => {
    try {
      const updatedName = prompt(
        "Enter updated service name",
        service.service_name
      );

      const updatedDescription = prompt(
        "Enter updated description",
        service.service_description
      );

      if (!updatedName || !updatedDescription) return;

      await serviceService.updateService(service.service_id, {
        service_name: updatedName,
        service_description: updatedDescription,
      });

      await loadServices();

      // SUCCESS MESSAGE
      setMessage("Service updated successfully");
      setMessageType("success");

    } catch (error) {
      console.log("Edit Error:", error);

      setMessage("Failed to update service");
      setMessageType("error");
    }
  };

  return (
    <section className="services-section">

      {/* ONLY ADDITION: MESSAGE UI */}
      {message && (
        <div
          style={{
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px",
            color: messageType === "success" ? "green" : "red",
            backgroundColor:
              messageType === "success" ? "#e6ffe6" : "#ffe6e6",
          }}
        >
          {message}
        </div>
      )}

      <div className="auto-container">

        <div className="services-wrapper">

          <div className="sec-title">
            <h2>Services we provide</h2>
            <div className="title-line"></div>
          </div>

          <div className="service-list">

            {services.length === 0 ? (
              <p>No services found</p>
            ) : (
              services.map((service) => (
                <div
                  className="service-item"
                  key={service.service_id}
                >
                  <div>
                    <h4>{service.service_name}</h4>
                    <p>{service.service_description}</p>
                  </div>

                  <div className="service-icons">

                    <FaEdit
                      onClick={() => handleEdit(service)}
                      style={{ cursor: "pointer", marginRight: "10px" }}
                    />

                    <FaTrash
                      onClick={() => handleDelete(service.service_id)}
                      style={{ cursor: "pointer" }}
                    />

                  </div>
                </div>
              ))
            )}

          </div>
        </div>

        <div className="add-service-box">

          <div className="sec-title">
            <h2>Add a new service</h2>
            <div className="title-line"></div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <input
                type="text"
                placeholder="Service name"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Service description"
                rows="7"
                value={serviceDescription}
                onChange={(e) =>
                  setServiceDescription(e.target.value)
                }
              ></textarea>
            </div>

            <button type="submit" className="theme-btn">
              ADD SERVICE
            </button>

          </form>

        </div>

      </div>
    </section>
  );
};

export default AdminServices;