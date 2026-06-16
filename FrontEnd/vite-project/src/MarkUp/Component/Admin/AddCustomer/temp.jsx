import React, { useState } from "react";
import { useAuth } from "../../../../Context/AuthContxt.jsx";
import customerService from '../../../../Services/customer.service.jsx';

function AddCustomerForm() 
  {
    const API_URL = import.meta.env.VITE_API_URL;
  
    const [customer_email, setEmail] = useState("");
    const [customer_first_name, setFirstName] = useState("");
    const [customer_last_name, setLastName] = useState("");
    const [customer_phone, setPhoneNumber] = useState("");
    const [customer_password, setPassword] = useState("");
    const [active_customer] = useState(1);
    const [company_role_id, setCompany_role_id] = useState(1);
  
    // errors
    const [emailError, setEmailError] = useState("");
    const [firstNameRequired, setFirstNameRequired] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [success, setSuccess] = useState(false);
    const [serverError, setServerError] = useState("");
    let loggedInEmployeeToken = '';
    // Destructure the auth hook and get the token 
    const { customer } = useAuth();
    if (customer && customer.customer_token) {
      loggedInEmployeeToken = customer.customer_token;
    }
  
  
     const handleSubmit = (e) => {
      // Prevent the default behavior of the form
      e.preventDefault();
      // Handle client side validations  
      let valid = true; // Flag 
      // First name is required 
      if (!customer_first_name) {
        setFirstNameRequired('First name is required');
        valid = false;
      } else {
        setFirstNameRequired('');
      }
      // Email is required
      if (!customer_email) {
        setEmailError('Email is required');
        valid = false;
      } else if (!customer_email.includes('@')) {
        setEmailError('Invalid email format');
      } else {
        const regex = /^\S+@\S+\.\S+$/;
        if (!regex.test(customer_email)) {
          setEmailError('Invalid email format');
          valid = false;
        } else {
          setEmailError('');
        }
      }
      // Password has to be at least 6 characters long
      const formData = {
        customer_email,
        customer_first_name,
        customer_last_name,
        customer_phone,
      };
      // Pass the form data to the service 
      const newCustomer = customerService.createCustomer(formData, loggedInEmployeeToken);
      newCustomer.then((response) => response.json())
        .then((data) => {
          // console.log(data);
          // If Error is returned from the API server, set the error message
          if (data.error) {
            setServerError(data.error)
          } else {
            // Handle successful response 
            setSuccess(true);
            setServerError('')
            // Redirect to the employees page after 2 seconds 
            // For now, just redirect to the home page 
            setTimeout(() => {
              // window.location.href = '/admin/employees';
              window.location.href = '/';
            }, 2000);
          }
        })
        // Handle Catch 
        .catch((error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          setServerError(resMessage);
        });
    }
  
    return (
      <section className="contact-section">
        <div className="auto-container">
          <div className="contact-title">
            <h2>Add a new customer</h2>
          </div>
  
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
  
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
  
                      {serverError && (
                        <div className="validation-error">{serverError}</div>
                      )}
  
                      {success && (
                        <div style={{ color: "green" }}>
                          Customer added successfully!
                        </div>
                      )}
  
                      {/* Email */}
                      <div className="form-group col-md-12">
                        <input
                          type="email"
                          value={customer_email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Customer email"
                        />
                        {emailError && (
                          <div className="validation-error">{emailError}</div>
                        )}
                      </div>
  
                      {/* First Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Customer first name"
                        />
                        {firstNameRequired && (
                          <div className="validation-error">
                            {firstNameRequired}
                          </div>
                        )}
                      </div>
  
                      {/* Last Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Customer last name"
                        />
                      </div>
  
                      {/* Phone */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={customer_phone}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Customer phone"
                        />
                      </div>
                      {/* Submit */}
                      <div className="form-group col-md-12">
                        <button className="theme-btn btn-style-one" type="submit">
                          <span>Add customer</span>
                        </button>
                      </div>
  
                    </div>
                  </form>
  
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </section>
    );
  }
  
  export default AddCustomerForm;