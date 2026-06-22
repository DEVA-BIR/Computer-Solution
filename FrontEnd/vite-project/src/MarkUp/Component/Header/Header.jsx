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

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="main-header header-style-one">

      {/* TOP BAR */}
      <div className="header-top">
        <div className="auto-container">
          <div className="inner-container">
            <div className="left-column">
              <div className="text"># Enjoy The Best While We Fix Your Car</div>
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

      {/* HEADER UPPER */}
      <div className="header-upper">
        <div className="auto-container">
          <div className="inner-container">

            {/* LOGO */}
            <div className="logo-box">
              <Link to="/" onClick={closeMenu}>
                <img src={Logo} alt="Logo" />
              </Link>
            </div>

            {/* HAMBURGER */}
            <div
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={menuOpen ? "fa fa-times" : "fa fa-bars"} />
            </div>

            {/* NAV */}
            <div className="right-column">
              <nav className="main-menu">
                <ul className={`navigation ${menuOpen ? "active" : ""}`}>

                  <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                  <li><Link to="/about" onClick={closeMenu}>About</Link></li>
                  <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
                  <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>

                  {isAdminOrManager && (
                    <li>
                      <Link to="/admin" onClick={closeMenu}>Admin</Link>
                    </li>
                  )}

                  {/* MOBILE AUTH */}
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
                        onClick={closeMenu}
                        className="theme-btn btn-style-one"
                      >
                        Login
                      </Link>
                    )}
                  </li>
                </ul>
              </nav>

              {/* DESKTOP AUTH */}
              <div className="desktop-auth">
                {isLogged ? (
                  <Link
                    to="/"
                    onClick={logOut}
                    className="theme-btn btn-style-one blue"
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

      {/* OVERLAY */}
      {menuOpen && (
        <div
          className="nav-overlay active"
          onClick={() => setMenuOpen(false)}
        />
      )}

    </header>
  );
}

export default Header;