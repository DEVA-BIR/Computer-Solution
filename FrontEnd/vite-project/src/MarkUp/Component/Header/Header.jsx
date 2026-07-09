import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Template-asset/images/loggo.jpg';
import { useAuth } from '../../../Context/AuthContxt.jsx';
import loginService from '../../../Services/login.service.jsx';


function Header() {
  const { isLogged, setIsLogged, employee } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isAdminOrManager = employee?.employee_role === 3;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const logOut = () => {
    loginService.logOut();
    setIsLogged(false);
    closeMobileMenu();
  };

  return (
    <div>
      <header className="main-header header-style-one">
        {/* Top Bar */}
        <div className="header-top">
          <div className="auto-container">
            <div className="inner-container">
              <div className="left-column">
                <div className="text">#Your Journey Starts with a Healthy Vehicle.</div>
                <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
              </div>
             <div className={`right-column ${isMobileMenuOpen ? "menu-open" : ""}`}>
                {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number">
                      <strong>Welcome {employee?.employee_first_name}</strong>
                    </div>
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

        {/* Main Header Area */}
        <div className="header-upper">
          <div className="auto-container">
            <div className="inner-container">
              <div className="logo-box">
                <div className="logo">
                  <Link to="/" onClick={closeMobileMenu}>
                    <img src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>

              <div className="right-column">
                <div className="nav-outer">
                  {/* Hamburger Toggle Button */}
                  <div 
                    className={`mobile-nav-toggler ${isMobileMenuOpen ? 'active' : ''}`} 
                    onClick={toggleMobileMenu}
                  >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>

                  {/* Navigation Menu Dropdown */}
                  <nav className={`main-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul className="navigation">
    <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>

    <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>

    <li><Link to="/services" onClick={closeMobileMenu}>Services</Link></li>

    <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>

    {isAdminOrManager && (
        <li>
            <Link to="/admin" onClick={closeMobileMenu}>
                Admin
            </Link>
        </li>
    )}

    <li className="mobile-login">

        {isLogged ? (

            <Link
                to="/"
                className="theme-btn btn-style-one blue"
                onClick={logOut}
            >
                Log Out
            </Link>

        ) : (

            <Link
                to="/login"
                className="theme-btn btn-style-one"
                onClick={closeMobileMenu}
            >
                Login
            </Link>

        )}

    </li>

</ul>
                  </nav>
                </div>

                {/* Login / Logout Button */}
                <div className="auth-btn-container">
                  {isLogged ? (
                    <div className="link-btn">
                      <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut}>Log out</Link>
                    </div>
                  ) : (
                    <div className="link-btn">
                      <Link to="/login" className="theme-btn btn-style-one" onClick={closeMobileMenu}>Login</Link>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;