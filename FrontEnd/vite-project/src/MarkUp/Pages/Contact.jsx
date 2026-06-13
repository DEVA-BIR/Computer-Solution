import React from "react";

import ABOUTBG from "../../assets/Images/background/aboutbg.jpg";

function Contact() {
  return (
    <div>

      {/* Page Title */}
      <section
        className="page-title"
        style={{
          backgroundImage: `url(${ABOUTBG})`,
        }}
      >
        <div className="auto-container">

          <h2>Contact</h2>

          <ul className="page-breadcrumb">

            <li>
              <a href="/">home</a>
            </li>

            <li>Contact</li>

          </ul>

        </div>

        <h1 data-parallax='{"x": 800}'>
          Repairing
        </h1>
      </section>

      {/* Contact Section */}
      <section className="contact-section">

        <div className="auto-container">

          <div className="contact-title">

            <h2>Drop us message</h2>

            <div className="text">
              Praising pain was born and I will give you a complete
              account of the system.
            </div>

          </div>

          <div className="row clearfix">

            {/* Form Column */}
            <div className="form-column col-lg-7">

              <div className="inner-column">

                <div className="contact-form">

                  <form>

                    <div className="row clearfix">

                      <div className="form-group col-md-12">

                        <input
                          type="text"
                          name="form_name"
                          placeholder="Your Name"
                          required
                        />

                      </div>

                      <div className="form-group col-md-12">

                        <input
                          type="email"
                          name="email"
                          placeholder="Your Email"
                          required
                        />

                      </div>

                      <div className="form-group col-md-12">

                        <input
                          type="text"
                          name="form_subject"
                          placeholder="Subject"
                          required
                        />

                      </div>

                      <div className="form-group col-md-12">

                        <textarea
                          name="form_message"
                          placeholder="Message"
                        ></textarea>

                      </div>

                      <div className="form-group col-md-12">

                        <input
                          type="hidden"
                          name="form_botcheck"
                        />

                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                        >
                          <span>Submit now</span>
                        </button>

                      </div>

                    </div>

                  </form>

                </div>

              </div>

            </div>

            {/* Info Column */}
            <div className="info-column col-lg-5">

              <div className="inner-column">

                <h4>Our Address</h4>

                <div className="text">
                  Completely synergize resource taxing relationships
                  via premier niche markets.
                </div>

                <ul>

                  <li>
                    <i className="flaticon-pin"></i>

                    <span>Address:</span>

                    Bole,DembelCity, Addis Ababa, Ethiopia
                  </li>

                  <li>
                    <i className="flaticon-email"></i>

                    <span>Email:</span>

                    contact@abegarage.com
                  </li>

                  <li>
                    <i className="flaticon-phone"></i>

                    <span>Phone:</span>

                  +251 911 000 0000 / +2519 897 3654
                  </li>

                </ul>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Map Section */}
      <section className="map-section">

        <div className="contact-map">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d11307.438772663172!2d38.76120563631354!3d9.02610558504024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1780487076917!5m2!1sen!2set"
            style={{
              border: 0,
              width: "200%",
              height: "400px"
            }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>

        </div>

      </section>

    </div>
  );
}

export default Contact;