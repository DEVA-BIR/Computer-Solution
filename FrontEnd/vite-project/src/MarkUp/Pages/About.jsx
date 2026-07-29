import React from "react";
import CarouselEffect from "../Component/Carousel/Carousel";
import RE0 from "../../assets/Images/background/RE00.jpeg";
import ABOUTBG2 from "../../assets/Images/background/aboutbg2.jpeg";
import RE1 from "../../assets/Images/background/RE1.jpeg";
import RE2 from "../../assets/Images/background/RE2.jpeg";
import RE5 from "../../assets/Images/background/RE_5.jpeg";
import ABOUT3 from "../../assets/Images/background/RE4.jpeg";
import IMAGE9 from "../../assets/Images/background/aboutbg2.jpeg";
import ABOUTBG from "../../assets/Images/background/aboutbg.jpeg";

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
          Desu Computer 
        </h1>
      </section>

      {/* About Section Three */}
      <section className="about-section-three">
        <div className="auto-container">

          <div className="row">

            <div className="col-lg-7">
              <div className="content">

                <h2>
                  Professional Computer &
                  <br />
                  Electronics Solutions
                </h2>

                <div className="text">

                  <p>
                         Desu Computer Solution provides reliable computer, laptop, printer,
                         and mobile phone repair services for individuals, businesses, and organizations.
               </p>

                  <p>
                    Our experienced technicians deliver fast, affordable, and professional
                    solutions using modern diagnostic tools and quality replacement parts.
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
                  <strong>5</strong> years
                  <br />
                  Experience
                </div>

              </div>
            </div>

            <div className="col-lg-7 pl-lg-5">

              <div className="sec-title">

                <h5>Welcome to Desu Computer Solution</h5>

                <h2>Providing Trusted Technology Solutions Since 2020</h2>

                <div className="text">

                 <p>
                   We specialize in computer and laptop repairs, software installation,
                   networking, CCTV installation, printer maintenance, and IT support.
                </p>

                  <p>
                    Customer satisfaction is our priority. We provide dependable services,
                    genuine spare parts, and expert technical support at competitive prices.
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
                    <h4>Advanced Diagnostic Technology</h4>

                    <div className="text">
                     We use modern diagnostic equipment to identify and solve hardware and software problems accurately.
                    </div>
                  </div>

                </div>

                <div className="icon-box">

                  <div className="icon">
                    <span className="flaticon-price-tag"></span>
                  </div>

                  <div>
                    <h4>Affordable Pricing</h4>

                    <div className="text">
                      Professional services at fair and transparent prices without compromising quality.
                    </div>
                  </div>

                </div>

                <div className="icon-box">

                  <div className="icon">
                    <span className="flaticon-fast-time"></span>
                  </div>

                  <div>
                   <h4>Fast Service Delivery</h4>

                    <div className="text">
                      Most repairs are completed quickly to minimize downtime for our customers.
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
                   We are committed to delivering reliable technology solutions with excellent customer service.
                </div>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>

                <h4>Certified IT Technicians</h4>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>

                <h4>Fast & Reliable Support</h4>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-price-tag-1"></span>
                </div>

                <h4>Affordable Service Rates</h4>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-trophy"></span>
                </div>

                <h4>Trusted by Hundreds of Customers</h4>
              </div>

            </div>

            <div className="col-lg-6">

              <div className="sec-title style-two">
                <h2>Our Services</h2>
              </div>

              <div className="row">

                <div className="col-md-5">

                  <div className="image">
                    <img src={RE5} alt="service" />
                  </div>

                </div>

                <div className="col-md-7">

                  <ul className="list">
                    <li>Desktop Computer Repair</li>
                    <li>Laptop Repair & Maintenance</li>
                    <li>Mobile Phone Repair</li>
                    <li>Printer Installation & Repair</li>
                    <li>Software Installation</li>
                    <li>Virus Removal & System Optimization</li>
                    <li>Data Recovery & Backup</li>
                    <li>Networking & Wi-Fi Setup</li>
                    <li>CCTV Camera Installation</li>
                    <li>Computer Accessories Sales</li>
                    <li>Operating System Installation</li>
                    <li>IT Technical Support</li> 
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

        <h5>Serving Customers Since 2020</h5>
         <h2>
              Every Electronics
            <br />
               Problem Solved Here
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
                <span>100%</span> Customer
                <br />
               Satisfaction
              </h2>

            </div>

            <div className="col-lg-9">

              <div className="row">

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-customer-service-1"></span>
                    </div>

                    <h4>Professional IT Support</h4>

                    <div className="text">
                      Expert technical assistance for homes, businesses, and organizations.
                    </div>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-car-1"></span>
                    </div>

                    <h4>All Major Computer Brands</h4>

                    <div className="text">
                      We repair desktops, laptops, printers, and mobile devices from leading brands.
                    </div>

                  </div>

                </div>

                <div className="col-md-4">

                  <div className="facts-block">

                    <div className="icon">
                      <span className="flaticon-maintenance"></span>
                    </div>

                    <h4>Complete Technology Solutions</h4>

                    <div className="text">
                     From hardware repairs to networking and software support, we provide complete IT solutions.
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
