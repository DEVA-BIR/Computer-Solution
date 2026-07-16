import React, { useState } from "react";

const ServiceDetail = () => {
  const [services, setServices] = useState([
     {
      name: "Performance Upgrade",
      description:
        "Enhance your vehicle's power, acceleration, handling, and overall driving performance with professional engine tuning, performance component upgrades, and system optimization. Our service is designed to improve responsiveness, efficiency, and driving enjoyment while maintaining reliability and safety.",
    },
    {
      name: "Transmission Services",
      description:
        "Keep your vehicle shifting smoothly and efficiently with expert transmission inspection, maintenance, repair, and fluid replacement services. Our technicians diagnose and resolve transmission issues to ensure reliable performance, improved drivability, and extended transmission life.",
    },
    {
      name: "Brake Repair Services",
      description:
        "Ensure your safety on the road with professional brake inspection, repair, and maintenance services. We diagnose and fix brake issues, replace worn components, and optimize braking performance for reliable stopping power, enhanced vehicle control, and peace of mind.",
    },
    {
      name: "Engine Services",
      description:
        "Keep your vehicle running at its best with professional engine inspection, maintenance, diagnostics, and repair services. Our experts identify and resolve engine issues to improve performance, fuel efficiency, reliability, and overall vehicle longevity.",
    },
    {
      name: "Tyre & Wheels Services",
      description:
        "Ensure a smooth, safe, and comfortable ride with professional tyre and wheel services, including fitting, balancing, alignment, rotation, and repairs. We help maximize tyre life, improve handling, and enhance overall driving performance and safety.",
    },
    {
      name: "Denting & Painting",
      description:
        "Restore your vehicle's appearance with professional dent repair and high-quality painting services. Whether your car has minor dents, scratches, collision damage, or faded paint, our skilled technicians use advanced repair techniques and premium materials to bring it back to its original condition.",
    },
    {
      name: "Air Conditioning Evacuation Service",
      description:
        "This service helps maintain proper cooling efficiency, protects A/C components from damage, and ensures clean, reliable operation. Regular A/C evacuation and servicing can extend the life of your air conditioning system and provide consistent comfort in all driving conditions",
    },
    {
      name: "General Service & Washing",
      description:
        "we provide a thorough interior and exterior wash to remove dirt, dust, and road grime, helping maintain your vehicle’s appearance and value. Regular servicing and cleaning contribute to better performance, improved longevity, and a more enjoyable driving experience",
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



  return (
    <section className="services-section">
      <div className="auto-container">

        {/* Services List */}
        <div className="services-wrapper">

          <div className="sec-title">
            <h2>Services Details</h2>
            <div className="title-line"></div>

            <p>
              At Abe Garage, we provide a comprehensive range of automotive services designed to keep your vehicle safe, reliable, and performing at its best. From routine maintenance and repairs to advanced diagnostics and performance upgrades, our skilled technicians are committed to delivering high-quality workmanship and exceptional customer service. Explore our specialized services below to find the right solution for your vehicle's needs.
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

  

  

</div>

              </div>
            ))}

          </div>
        </div>

        {/* Add Service Form */}
  

      </div>
    </section>
  );
}
  

export default ServiceDetail;