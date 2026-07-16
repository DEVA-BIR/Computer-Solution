import React from "react";

// Images
import HERO_BG from "../../assets/Images/background/RE-0.jpg";
import ABOUTBG from "../../assets/Images/background/aboutbg.jpg";
import RE5 from "../../assets/Images/background/RE5.jpg";

function Services() {
  return (
    <div>
      {/* Page Title */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${HERO_BG})`,
        }}
      >
        <div className="auto-container">
          <h2>Services</h2>

          <ul className="page-breadcrumb">
            <li>
              <a href="/">home</a>
            </li>
            <li>Services</li>
          </ul>
        </div>

       
      </section>

      {/* Services Section */}
      <section className="services-section style-three">
        <div className="auto-container">
          <div className="sec-title style-two">
            <h2>Services that we offer</h2>

            <div className="text">
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal that
              has evolved from generation X is on the runway heading towards a
              streamlined cloud solution.
            </div>
          </div>

          <div className="row clearfix">
            {[
              { title: "Performance Upgrade", icon: "flaticon-power" },
              { title: "Transmission Services", icon: "flaticon-gearbox" },
              { title: "Break Repair & Service", icon: "flaticon-brake-disc" },
              { title: "Engine Service & Repair", icon: "flaticon-car-engine" },
              { title: "Tyre & Wheels", icon: "flaticon-tire" },
              { title: "Denting & Painting", icon: "flaticon-spray-gun" },
              { title: "Air Conditioning Evac", icon: "flaticon-air-conditioning" },
              { title: "General Service & Washing", icon: "flaticon-car-service" },
            ].map((item, index) => (
              <div className="col-lg-4 service-block-one" key={index}>
                <div className="inner-box hvr-float-shadow">
                  <h5>Service and Repairs</h5>
                  <h2>{item.title}</h2>

                  <a href="/admin/ServiceDetails" className="read-more">
                    read more +
                  </a>

                  <div className="icon">
                    <span className={item.icon}></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
       <section className="why-choose-us">
              <div className="auto-container">
      
                <div className="row">
      
                  <div className="col-lg-6">
      
                    <div className="sec-title style-two">
      
                      <h2>Why Choose Us</h2>
      
                      <div className="text">
                        Bring to the table win-win survival strategies.
                      </div>
      
                    </div>
      
                    <div className="icon-box">
                      <div className="icon">
                        <span className="flaticon-mechanic"></span>
                      </div>
      
                      <h4>Certified Expert Mechanics</h4>
                    </div>
      
                    <div className="icon-box">
                      <div className="icon">
                        <span className="flaticon-wrench"></span>
                      </div>
      
                      <h4>Fast And Quality Service</h4>
                    </div>
      
                  </div>
      
                  <div className="col-lg-6">
      
                    <div className="sec-title style-two">
                      <h2>Additional Services</h2>
                    </div>
      
                    <div className="row">
      
                      <div className="col-md-5">
                        <div className="image">
      
                          <img
                            src={RE5}
                            alt="Service"
                            style={{ width: "100%" }}
                          />
      
                        </div>
                      </div>
      
                      <div className="col-md-7">
      
                        <ul className="list">
                          <li>General Auto Repair & Maintenance</li>
                          <li>Transmission Repair & Replacement</li>
                          <li>Tire Repair and Replacement</li>
                          <li>Wheel Alignment</li>
                        </ul>
      
                      </div>
      
                    </div>
      
                  </div>
      
                </div>
              </div>
            </section>

      {/* Video Section */}
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${ABOUTBG})`,
          }}
        ></div>

        <div className="auto-container">
          <h5>Working since 1992</h5>

          <h2>
            We are leader <br /> in Car Mechanical Work
          </h2>

          <div className="video-box">
            <div className="video-btn">
              <a
                href="https://www.youtube.com/watch?v=nfP5N9Yc72A&t=28s"
                className="overlay-link lightbox-image video-fancybox ripple"
              >
                <i className="flaticon-play"></i>
              </a>
            </div>

            <div className="text">
              Watch intro video <br /> about us
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;