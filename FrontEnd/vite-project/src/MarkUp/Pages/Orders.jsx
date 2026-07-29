import React from 'react'
import { useAuth } from '../../Context/AuthContxt.jsx';



const Orders = () => {
 const services = [
  {
    title: "Hardware Diagnosis",
    desc: "Complete inspection to identify hardware problems and recommend the best repair solution.",
  },
  {
    title: "Operating System Installation",
    desc: "Install or reinstall Windows, Linux, or other operating systems with all necessary drivers.",
  },
  {
    title: "Virus & Malware Removal",
    desc: "Remove viruses, malware, and unwanted software while improving system performance.",
  },
  {
    title: "Data Backup & Recovery",
    desc: "Recover lost files and securely back up important data whenever possible.",
  },
  {
    title: "Final Testing & Quality Check",
    desc: "Verify that the device is fully functional before returning it to the customer.",
  },
];

  return (
    <>
      <div className="track-wrapper">
        <div className="container">
          {/* TITLE */}
          <div className="title-row">
            <div>
              <h1>Abeba Bikila</h1>

              <p>
  Track the repair status of your electronic device. We will update this page regularly so you can monitor the progress of your service request.
</p>
            </div>

            <span className="status-badge">In progress</span>
          </div>

          {/* INFO CARDS */}
          <div className="info-grid">
            {/* CUSTOMER */}
            <div className="info-card">
              <small>CUSTOMER</small>

              <h3>Abeba Bikila</h3>

              <p>
                <strong>Email:</strong> abeba@mail.com
              </p>

              <p>
                <strong>Phone Number:</strong> 240835487
              </p>

              <p>
                <strong>Active Customer:</strong> Yes
              </p>
            </div>

            {/* CAR */}
            <div className="info-card">
             <small>DEVICE IN SERVICE</small>

              <h3>Dell Inspiron 15 Laptop</h3>

              <p>
                <strong>Device Serial no:</strong> 0101AD
              </p>

              <p>
                <strong>Device year:</strong> 2020
              </p>

              <p>
                <strong>Device IMEI:</strong> 12000
              </p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="service-box">
            <small>Dell Inspiron 15 Laptop</small>

            <h2>Requested service</h2>

            {services.map((service, index) => (
              <div className="service-item" key={index}>
                <div>
                  <h4>{service.title}</h4>

                  <p>{service.desc}</p>
                </div>

                <span className="status-badge small">
                 Diagnosing
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </>
  );
};
export default Orders;
