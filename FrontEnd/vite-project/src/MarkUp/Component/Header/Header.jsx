import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/Template-asset/images/loggo.jpg";
import { useAuth } from "../../../Context/AuthContxt.jsx";
import loginService from "../../../Services/login.service.jsx";

function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdminOrManager =
    employee?.employee_role === 2 || employee?.employee_role === 3;

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
    setMenuOpen(false);
  };

  return (
    <header className="main-header header-style-one">
      {/* Header Top */}
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text">
                # Enjoy The Best While We Fix Your Car
              </div>
              <div className="office-hour">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>

            <div className="right-column">
              {isLogged ? (
                <div className="phone-number">
                  <strong>Welcome {employee?.employee_first_name}</strong>
                </div>
              ) : (
                <div className="phone-number">
                  Schedule Appointment: <strong>+251911000000</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Header Upper */}
      <div className="header-upper">
        <div className="auto-container">
          <div className="inner-container">
            {/* Logo */}
            <div className="logo-box">
              <Link to="/">
                <img src={Logo} alt="Garage Logo" />
              </Link>
            </div>

            {/* Hamburger */}
            <div
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={menuOpen ? "fa fa-times" : "fa fa-bars"}></i>
            </div>

            {/* Right Side */}
            <div className="right-column">
              <div className="nav-outer">
                <nav className="main-menu">
                  <ul className={menuOpen ? "navigation active" : "navigation"}>
                    <li>
                      <Link to="/" onClick={() => setMenuOpen(false)}>
                        Home
                      </Link>
                    </li>

                    <li>
                      <Link to="/about" onClick={() => setMenuOpen(false)}>
                        About
                      </Link>
                    </li>

                    <li>
                      <Link to="/services" onClick={() => setMenuOpen(false)}>
                        Services
                      </Link>
                    </li>

                    <li>
                      <Link to="/contact" onClick={() => setMenuOpen(false)}>
                        Contact
                      </Link>
                    </li>

                    {isAdminOrManager && (
                      <li>
                        <Link to="/admin" onClick={() => setMenuOpen(false)}>
                          Admin
                        </Link>
                      </li>
                    )}

                    {/* Mobile Login/Logout */}
                    <li className="mobile-auth">
                      {isLogged ? (
                        <Link
                          to="/"
                          onClick={logOut}
                          className="theme-btn btn-style-one blue"
                        >
                          Log out
                        </Link>
                      ) : (
                        <Link
                          to="/login"
                          className="theme-btn btn-style-one"
                          onClick={() => setMenuOpen(false)}
                        >
                          Login
                        </Link>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Desktop Login/Logout */}
              <div className="desktop-auth">
                {isLogged ? (
                  <Link
                    to="/"
                    className="theme-btn btn-style-one blue"
                    onClick={logOut}
                  >
                    Log out
                  </Link>
                ) : (
                  <Link to="/login" className="theme-btn btn-style-one">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <div className="sticky-header">
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <Link to="/">
                  <img src={Logo} alt="Garage Logo" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-overlay"></div>
    </header>
  );
}

export default Header;