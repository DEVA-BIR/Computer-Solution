import React, { useState } from "react";

const ServiceDetail = () => {
 const [services, setServices] = useState([
  {
    name: "Computer & Laptop Repair",
    description:
      "We diagnose and repair desktops and laptops from all major brands. Our services include motherboard repair, screen replacement, keyboard replacement, battery replacement, charging port repair, RAM and SSD upgrades, overheating solutions, and hardware troubleshooting.",
  },
  {
    name: "Mobile Phone Repair",
    description:
      "Professional repair services for Android and iPhone devices including screen replacement, battery replacement, charging port repair, camera repair, speaker and microphone replacement, software troubleshooting, and water damage diagnostics.",
  },
  {
    name: "Software Installation & System Setup",
    description:
      "We install Windows, Linux, Microsoft Office, antivirus software, drivers, and other essential applications. We also configure systems for optimal performance and security.",
  },
  {
    name: "Virus Removal & Data Recovery",
    description:
      "Protect your valuable data with professional virus removal, malware cleanup, system optimization, and data recovery services for accidentally deleted or corrupted files whenever recovery is possible.",
  },
  {
    name: "Networking & Wi-Fi Solutions",
    description:
      "We design, install, and maintain wired and wireless networks for homes, offices, schools, and businesses. Our services include router configuration, network troubleshooting, and internet optimization.",
  },
  {
    name: "Printer Repair & Maintenance",
    description:
      "Repair and maintenance services for inkjet and laser printers, including cartridge replacement, paper jam removal, print quality improvement, hardware repair, and routine servicing.",
  },
  {
    name: "Buying & Selling Computers and Mobile Phones",
    description:
      "We buy and sell new and used desktop computers, laptops, mobile phones, printers, and accessories. Every device is carefully tested to ensure quality and reliability before sale.",
  },
  {
    name: "IT Support & Technical Consulting",
    description:
      "Our experienced technicians provide technical support for individuals, businesses, schools, and organizations. We offer troubleshooting, maintenance, hardware upgrades, software support, and technology consulting.",
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
            <h2>Our Service Details</h2>
            <div className="title-line"></div>

            <p>
        At Desu Computer Solution, we provide complete technology solutions for
        individuals, businesses, and organizations. Our experienced technicians
        specialize in computer and laptop repair, mobile phone servicing, software
        installation, networking, printer maintenance, IT support, and the buying
        and selling of new and used electronic devices. We are committed to
        delivering reliable, affordable, and high-quality services that keep your
        technology running efficiently.
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