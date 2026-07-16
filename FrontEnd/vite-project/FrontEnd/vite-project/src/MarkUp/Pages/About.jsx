import React from "react";

import RE0 from "../../assets/Images/background/RE-0.jpg";
import ABOUTBG2 from "../../assets/Images/background/aboutbg2.jpg";
import RE1 from "../../assets/Images/background/RE-1.png";
import RE2 from "../../assets/Images/background/RE-2.png";
import RE5 from "../../assets/Images/background/RE5.jpg";
import ABOUT3 from "../../assets/Images/background/RE-4.jpg";
import IMAGE9 from "../../assets/Images/background/aboutbg2.jpg";
import ABOUTBG from "../../assets/Images/background/aboutbg.jpg";

function About() {
  return (
    <div>

      {/* Page Title */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${RE0})`,
        }}
      >
        <div className="auto-container">
          <h2>About us</h2>

          <ul className="page-breadcrumb">
            <li>
              <a href="/">home</a>
            </li>

            <li>About us</li>
          </ul>
        </div>

        <h1 data-parallax='{"x": 200}'>
          Car Repairing
        </h1>
      </section>

      {/* About Section Three */}
      <section className="about-section-three">
        <div className="auto-container">

          <div className="row">

            <div className="col-lg-7">
              <div className="content">

                <h2>
                  We are highly skilled mechanics
                  <br />
                  for your car repair
                </h2>

                <div className="text">

                  <p>
                    Bring to the table win-win survival strategies
                    to ensure proactive domination.
                  </p>

                  <p>
                    Capitalize on low hanging fruit to identify a
                    ballpark value added activity to beta test.
                  </p>

                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <div className="image">
                <img src={ABOUTBG2} alt="about" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">

        <div className="auto-container">

          <div className="row">

            <div className="col-lg-5">

              <div className="image-box">

                <div className="images-wrapper">

                  <img
                    src={RE1}
                    alt="car"
                    className="img-one"
                  />

                  <img
                    src={RE2}
                    alt="car"
                    className="img-two"
                  />

                </div>

                <div
                  className="year-experience"
                  data-parallax='{"y": 30}'
                >
                  <strong>17</strong> years
                  <br />
                  Experience
                </div>

              </div>
            </div>

            <div className="col-lg-7 pl-lg-5">

              <div className="sec-title">

                <h5>Welcome to Our workshop</h5>

                <h2>We have 17 years experience</h2>

                <div className="text">

                  <p>
                    Bring to the table win-win survival strategies
                    to ensure proactive domination.
                  </p>

                  <p>
                    Capitalize on low hanging fruit to identify a
                    ballpark value added activity.
                  </p>

                </div>

                <div className="link-btn mt-40">

                  <a
                    href="/about"
                    className="theme-btn btn-style-one style-two"
                  >
                    <span>
                      About Us{" "}
                      <i className="flaticon-right"></i>
                    </span>
                  </a>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us */}
     

      {/* Why Choose Us Two */}
      <section className="why-choose-us-two">

        <div className="auto-container">

          <div className="row no-gutters">

            <div className="col-xl-6 left-column">

              <div className="inner-container">

                <div className="sec-title style-two light">
                  <h2>Why Choose Us</h2>
                </div>

                <div className="icon-box">

                  <div className="icon">
                    <span className="flaticon-repair"></span>
                  </div>

                  <div>
                    <h4>Smart Technology</h4>

                    <div className="text">
                      Leverage agile frameworks to provide a robust synopsis.
                    </div>
                  </div>

                </div>

                <div className="icon-box">

                  <div className="icon">
                    <span className="flaticon-price-tag"></span>
                  </div>

                  <div>
                    <h4>Best & Reasonable Prices</h4>

                    <div className="text">
                      Iterative approaches to corporate strategy.
                    </div>
                  </div>

                </div>

                <div className="icon-box">

                  <div className="icon">
                    <span className="flaticon-fast-time"></span>
                  </div>

                  <div>
                    <h4>Timely Delivery</h4>

                    <div className="text">
                      Foster collaborative thinking to further.
                    </div>
                  </div>

                </div>

              </div>
            </div>

            <div 
              className="col-xl-6 right-column"
              style={{
                backgroundImage: `url(${ABOUT3})`,
              }}
            >

              <div className="image">
                <img src={IMAGE9} alt="garage" />
              </div>

            </div>

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

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>

                <h4>Best Prices in Town</h4>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>

                <h4>Awarded Workshop</h4>
              </div>

            </div>

            <div className="col-lg-6">

              <div className="sec-title style-two">
                <h2>Addtional Services</h2>
              </div>

              <div className="row">

                <div className="col-md-5">

                  <div className="image">
                    <img src={RE5} alt="service" />
                  </div>

                </div>

                <div className="col-md-7">

                  <ul className="list">
                    <li>General Auto Repair & Maintenance</li>
                    <li>Transmission Repair & Replacement</li>
                    <li>Tire Repair and Replacement</li>
                    <li>State Emissions Inspection</li>
                    <li>Break Job / Break Services</li>
                    <li>Electrical Diagnostics</li>
                    <li>Fuel System Repairs</li>
                    <li>Starting and Charging Repair</li>
                    <li>Steering and Suspension Work</li>
                    <li>Emission Repair Facility</li>
                    <li>Wheel Alignment</li>
                    <li>Computer Diagnostic Testing</li>
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

          <h5>Working since 1999</h5>

          <h2>
            We are leader
            <br />
            in Car Mechanical Work
          </h2>

          <div className="video-box">
          </div>
        </div>
      </section>

      {/* Facts Section */}
      <section className="facts-section">

        <div className="auto-container">

          <div className="row align-items-center">

            <div className="col-lg-3">

              <h2>
                <span>100%</span> Satisfaction
                <br />
                Guarantee
              </h2>

            </div>

            <div className="col-lg-9">

              <div className="row">

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-customer-service-1"></span>
                    </div>

                    <h4>Quality Support</h4>

                    <div className="text">
                      Our Repair Services offers quality help programs.
                    </div>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-car-1"></span>
                    </div>

                    <h4>All Car Makes</h4>

                    <div className="text">
                      Our Repair Services offers quality help programs.
                    </div>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-maintenance"></span>
                    </div>

                    <h4>Variety Services</h4>

                    <div className="text">
                      Our Repair Services offers quality help programs.
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
