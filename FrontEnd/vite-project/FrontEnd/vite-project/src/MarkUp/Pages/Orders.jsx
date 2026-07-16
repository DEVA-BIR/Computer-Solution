import React from 'react'
import { useAuth } from '../../Context/AuthContxt.jsx';



const Orders = () => {
  const services = [
    {
      title: "Tire repairs and changes",
      desc: "Without good, inflated tires, you loose speed, control, and fuel efficiency, hence the need to get them patched if there's a leak.",
    },
    {
      title: "Brake work",
      desc: "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
    },
    {
      title: "Spark Plug replacement",
      desc: "Spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start.",
    },
    {
      title: "Brake work",
      desc: "We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.",
    },
    {
      title: "Additional request",
      desc: "Additional",
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
                You can track the progress of your order using this page. We
                will constantly update this page to let you know how we are
                progressing.
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
              <small>CAR IN SERVICE</small>

              <h3>BMW X7 (Gold)</h3>

              <p>
                <strong>Vehicle tag:</strong> 0101AD
              </p>

              <p>
                <strong>Vehicle year:</strong> 2020
              </p>

              <p>
                <strong>Vehicle mileage:</strong> 12000
              </p>
            </div>
          </div>

          {/* SERVICES */}
          <div className="service-box">
            <small>BMW X7</small>

            <h2>Requested service</h2>

            {services.map((service, index) => (
              <div className="service-item" key={index}>
                <div>
                  <h4>{service.title}</h4>

                  <p>{service.desc}</p>
                </div>

                <span className="status-badge small">
                  In progress
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
