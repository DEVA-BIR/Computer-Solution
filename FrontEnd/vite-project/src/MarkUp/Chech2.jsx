import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminServices = () => {
  const [services, setServices] = useState([
    {
      name: "Oil change",
      description:
        "Every 5,000 kilometres or so, you need to change the oil in your car to keep your engine in the best possible shape.",
    },

    {
      name: "Spark Plug replacement",
      description:
        "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
    },

    {
      name: "Fuel Cap tightening",
      description:
        "Loose fuel caps are actually a main reason why the check engine light in a car comes on.",
    },
  ]);

  // Form State
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");

  // Add Service Function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!serviceName || !serviceDescription) {
      alert("Please fill all fields");
      return;
    }

    const newService = {
      name: serviceName,
      description: serviceDescription,
    };

    // Add New Service
    setServices([...services, newService]);

    // Clear Inputs
    setServiceName("");
    setServiceDescription("");
  };
  // Delete Service
const handleDelete = (index) => {
  const updatedServices = services.filter(
    (_, serviceIndex) => serviceIndex !== index
  );

  setServices(updatedServices);
};

// Edit Service
const handleEdit = (index) => {
  const updatedName = prompt(
    "Enter updated service name",
    services[index].name
  );

  const updatedDescription = prompt(
    "Enter updated description",
    services[index].description
  );

  if (updatedName && updatedDescription) {
    const updatedServices = [...services];

    updatedServices[index] = {
      name: updatedName,
      description: updatedDescription,
    };

    setServices(updatedServices);
  }
};

  return (
    <section className="services-section">
      <div className="auto-container">

        {/* Services List */}
        <div className="services-wrapper">

          <div className="sec-title">
            <h2>Services we provide</h2>
            <div className="title-line"></div>

            <p>
              Bring to the table win-win survival strategies to ensure
              proactive domination. At the end of the day, going forward,
              a new normal that has evolved from generation X is on the
              runway heading towards a streamlined cloud solution.
            </p>
          </div>

          <div className="service-list">

            {services.map((service, index) => (
              <div className="service-item" key={index}>

                <div>
                  <h4>{service.name}</h4>
                  <p>{service.description}</p>
                </div>

                <div className="service-icons">

  <FaEdit
    onClick={() => handleEdit(index)}
    style={{ cursor: "pointer" }}
  />

  <FaTrash
    onClick={() => handleDelete(index)}
    style={{ cursor: "pointer" }}
  />

</div>

              </div>
            ))}

          </div>
        </div>

        {/* Add Service Form */}
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
}
  

export default AdminServices;