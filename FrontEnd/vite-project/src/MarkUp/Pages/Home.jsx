import React from "react";
import CarouselEffect from "../Component/Carousel/Carousel";
// IMPORT IMAGES
import RE1 from "../../assets/Images/background/RE1.jpeg";
import RE2 from "../../assets/Images/background/RE2.jpeg";
import RE4 from "../../assets/Images/background/RE42.jpeg";
import RE5 from "../../assets/Images/background/RE_5.jpeg";
import RE8 from "../../assets/Images/background/RE8.jpeg";

function Home() {
  return (
    <div>

      {/* Video Section */}
    <section className="video-section">

  <CarouselEffect />

  <div className="hero-content">
    <div className="auto-container">
      <h5>Serving Customers Since 2020</h5>

      <h2>
        Your Trusted
        <br />
       Desu Computer Solution
      </h2>

      <a href="/about" className="theme-btn btn-style-one">
        <span>Learn More</span>
      </a>
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
      <strong>5</strong> years
      <br />
      Experience
    </div>

  </div>
</div>

            <div className="col-lg-7 pl-lg-5">
              <div className="sec-title">

               <h5>Welcome to Desu Computer Solution</h5>

               <h2>We provide professional computer and electronics services</h2>

                <div className="text">

                 <p>
  We specialize in computer, laptop, and mobile device sales, repairs,
  maintenance, and technical support.
</p>

<p>
  Our experienced technicians deliver reliable, affordable, and fast
  solutions for all your electronic devices.
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
                   Professional repair, maintenance, and sales for computers, laptops,
                    mobile phones, and accessories.
        </div>
          </div>

          <div className="row">

            <div className="col-lg-4 service-block-one">
              <div className="inner-box hvr-float-shadow">

                <h5>Computer Repair</h5>

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

                <h5>Mobile Solutions</h5>

              <h2>Mobile Phone Repair</h2>

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

                <h5>Sales & Support</h5>

                <h2>Computer Accessories</h2>

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
  We use the latest diagnostic tools and genuine replacement parts to
  ensure reliable repairs.
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
                        Trusted professionals delivering fast, reliable, and affordable
                        technology solutions.
              </div>

              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-mechanic"></span>
                </div>

              <h4>Certified Computer Technicians</h4>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <span className="flaticon-wrench"></span>
                </div>

               <h4>Fast & Reliable Repair Services</h4>
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
                    <li>Desktop & Laptop Repair</li>
                     <li>Mobile Phone Repair</li>
                     <li>Printer Installation & Maintenance</li>
                     <li>Software Installation & Virus Removal</li>
                    <li>Data Recovery & Backup</li>
                     <li>Networking & CCTV Installation</li>
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
        <h5>Serving Customers Since 2020</h5>

        <h2>
                   Every Electronics
           <br />
            Problem Solved Here
             </h2>
      </div>
    </section>

      {/* CTA Section */}
      <section className="cta-section">

        <div className="auto-container">

          <div className="wrapper-box">

            <div className="left-column">

             <h3>Need Fast Computer or Mobile Repair?</h3>

              <div className="text">
  Your trusted partner for computer sales, repairs, maintenance, and
  technical support.
</div>

            </div>

            <div className="right-column">

              <div className="phone">+251940066308</div>

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
