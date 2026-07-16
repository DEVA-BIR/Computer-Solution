import React from "react";

// IMPORT IMAGES
import RE0 from "../../assets/Images/background/RE-0.jpg";
import RE1 from "../../assets/Images/background/RE-1.png";
import RE2 from "../../assets/Images/background/RE-2.png";
import RE4 from "../../assets/Images/background/RE-4.jpg";
import RE5 from "../../assets/Images/background/RE5.jpg";
import RE8 from "../../assets/Images/background/RE8.jpg";

function Home() {
  return (
    <div>

      {/* Video Section */}
      <section className="video-section">
        <div
          data-parallax='{"y": 50}'
          className="sec-bg"
          style={{
            backgroundImage: `url(${RE0})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "700px",
          }}
        ></div>

        <div className="auto-container">
          <h5>Working since 1999</h5>

          <h2>
            TuneUp your car
            <br />
            to next level
          </h2>

          <div className="video-box">
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
      <img src={RE1} alt="car gear" className="img-one" />

      <img src={RE2} alt="car rear" className="img-two" />
    </div>

    <div
      className="year-experience"
      data-parallax='{"y": 30}'
    >
      <strong>17 </strong> years
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
                    Bring to the table win-win survival strategies to
                    ensure proactive domination.
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

      {/* Services Section */}
      <section className="services-section">
        <div className="auto-container">

          <div className="sec-title style-two">
            <h2>Our Featured Services</h2>

            <div className="text">
              Bring to the table win-win survival strategies.
            </div>
          </div>

          <div className="row">

            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">

                <h5>Service and Repairs</h5>

                <h2>Performance Upgrade</h2>

                <a href="/admin/ServiceDetails" className="read-more">
                  read more +
                </a>

                <div className="icon">
                  <span className="flaticon-power"></span>
                </div>

              </div>
            </div>

            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">

                <h5>Service and Repairs</h5>

                <h2>Transmission Services</h2>

                <a href="/admin/ServiceDetails" className="read-more">
                  read more +
                </a>

                <div className="icon">
                  <span className="flaticon-gearbox"></span>
                </div>

              </div>
            </div>

            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">

                <h5>Service and Repairs</h5>

                <h2>Break Repair & Service</h2>

                <a href="/admin/ServiceDetails" className="read-more">
                  read more +
                </a>

                <div className="icon">
                  <span className="flaticon-brake-disc"></span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
  <div className="features-row">

    <div className="left">
      <div className="inner-container">
        <h2>
          Quality Service And
          <br />
          Customer Satisfaction !!
        </h2>

        <div className="text">
          We utilize the most recent symptomatic gear.
        </div>
      </div>
    </div>

    <div className="right">
      <img src={RE4} alt="Feature" />
    </div>

  </div>
</section>

      {/* Why Choose Us */}
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
      <section className="video-section">
      <div
        data-parallax='{"y": 50}'
        className="sec-bg"
        style={{
          backgroundImage: `url(${RE8})`,
        }}
      ></div>

      <div className="auto-container">
        <h5>Working since 1992</h5>

        <h2>
          We are leader <br /> in Car Mechanical Work
        </h2>
      </div>
    </section>

      {/* CTA Section */}
      <section className="cta-section">

        <div className="auto-container">

          <div className="wrapper-box">

            <div className="left-column">

              <h3>Schedule Your Appointment Today</h3>

              <div className="text">
                Your Automotive Repair & Maintenance Service Specialist
              </div>

            </div>

            <div className="right-column">

              <div className="phone">1800.456.7890</div>

              <div className="btn">
                <a href="#" className="theme-btn btn-style-one">
                  <span>Appointment</span>
                  <i className="flaticon-right"></i>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

export default Home;
