import React from "react";
import CarouselEffect from "../Component/Carousel/Carousel";
import ABOUTBG from "../../assets/Images/background/aboutbg.jpeg";

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

      {/* Contact Section */}
      <section className="contact-section">

        <div className="auto-container">

          <div className="contact-title">

            <h2><h2>Get In Touch</h2></h2>

            <div className="text">
  Have questions or need technical assistance? Contact Desu Computer Solution today. We're ready to help with computer repairs, mobile services, networking, and IT support.
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
                          placeholder="Service Needed"
                          required
                        />

                      </div>

                      <div className="form-group col-md-12">

                        <textarea
                          name="form_message"
                          placeholder="Describe your issue or request"
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
                          <span>Send Message</span>
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

                <h4>Contact Information</h4>

                <div className="text">
                   Visit our office or contact us for professional computer, 
                   laptop, mobile phone, printer, networking, and IT support services.
               </div>

                <ul>

                  <li>
                    <i className="flaticon-pin"></i>

                    <span>Address:</span>

                    Ambo, Oromia, Ethiopia
                  </li>

                  <li>
                    <i className="flaticon-email"></i>

                    <span>Email:</span>

                    contact@desucomputersolution.com
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
