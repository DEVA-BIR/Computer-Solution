import React from "react";
import CarouselEffect from "../Component/Carousel/Carousel";
// Images
import HERO_BG from "../../assets/Images/background/RE00.jpeg";
import ABOUTBG from "../../assets/Images/background/aboutbg.jpeg";
import RE5 from "../../assets/Images/background/RE_5.jpeg";

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
           <h2>Professional IT & Electronics Services</h2>

            <div className="text">
              At Desu Computer Solution, we provide complete technology solutions,
              including computer and laptop repair, mobile phone servicing,
              software installation, networking, CCTV installation, printer
              maintenance, IT support, and the buying and selling of new and
              used electronic devices.
             </div>
          </div>

          <div className="row clearfix">
            {[
  {
    title: "Computer & Laptop Repair",
    icon: "flaticon-computer",
  },
  {
    title: "Mobile Phone Repair",
    icon: "flaticon-smartphone",
  },
  {
    title: "Software Installation",
    icon: "flaticon-mobile",
  },
  {
    title: "Networking & Wi-Fi Setup",
    icon: "flaticon-network",
  },
  {
    title: "Printer Repair & Maintenance",
    icon: "flaticon-printer",
  },
  {
    title: "CCTV Installation",
    icon: "flaticon-security-camera",
  },
  {
    title: "Buy Used Computers & Phones",
    icon: "flaticon-shopping-cart",
  },
  {
    title: "Sell New & Used Electronics",
    icon: "flaticon-online-shop",
  },
].map((item, index) => (
              <div className="col-lg-4 service-block-one" key={index}>
                <div className="inner-box hvr-float-shadow">
                  <h5>Technology Solutions</h5>
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
                             We are committed to delivering reliable repairs, quality products,
                             affordable prices, and outstanding customer service.
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
      
                      <h4>Fast, Reliable & Professional Service</h4>
                    </div>
      
                  </div>
      
                  <div className="col-lg-6">
      
                    <div className="sec-title style-two">
                      <h2>Our Complete Services</h2>
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
                          <ul className="list">
                    <li>Desktop Computer Repair</li>
                    <li>Laptop Repair & Maintenance</li>
                    <li>Mobile Phone Repair</li>
                    <li>Printer Installation & Repair</li>
                    <li>Software Installation & Updates</li>
                    <li>Virus Removal & Data Recovery</li>
                    <li>Networking & Wi-Fi Configuration</li>
                    <li>CCTV Camera Installation</li>
                    <li>IT Technical Support</li>
                    <li>Computer Accessories Sales</li>
                    <li>Buy Used Computers & Mobile Phones</li>
                    <li>Sell New & Used Computers, Laptops & Mobile Phones</li>
                        </ul>
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
          <h5>Working since 2020</h5>

             <h2>
                Every Electronics
              <br />
               Problem Solved Here
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
              Discover our <br /> technology solutions
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
