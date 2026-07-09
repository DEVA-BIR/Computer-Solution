import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../../../assets/Template-asset/images/loggo.jpg'
import { useAuth } from '../../../Context/AuthContxt.jsx';
import loginService from '../../../Services/login.service.jsx';

function Header() {
    //console.log(useAuth()) ;
    const { isLogged, setIsLogged, employee } = useAuth();
  // console.log(useAuth());
const isAdminOrManager =
  employee?.employee_role === 2 ||
  employee?.employee_role === 3;

  // Log out event handler function
  const logOut = () => {
    // Call the logout function from the login service 
    loginService.logOut();
    // Set the isLogged state to false 
    setIsLogged(false);
    console.log("Employee:", employee);
console.log("Role:", employee?.employee_role);
  }
  return (
    <div>
   <header className="main-header header-style-one">

        <div className="header-top">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="left-column">
                        <div className="text"># Enjoy The Beso While We fix your car</div>
                        <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
                    </div>
                    <div className="right-column">
                        {isLogged ? (
                  <div className="link-btn">
                    <div className="phone-number"><strong>Welcome {employee?.employee_first_name}</strong></div>
                  </div>
                ) : (
                  <div className="phone-number">Schedule Appointment: <strong>+251911000000   </strong> </div>
                )}
                    </div>
                </div>
            </div>
        </div>
        <div className="header-upper">
            <div className="auto-container">
                <div className="inner-container">
               
                    <div className="logo-box">
                        <div className="logo"><a href="index.html"><img src={Logo} alt="" /></a></div>
                    </div>
                    <div className="right-column">
                    
                        <div className="nav-outer">
                           
                            <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" /></div>

                            <nav className="main-menu navbar-expand-md navbar-light">
                                <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                                    <ul className="navigation">
                                        <li className="dropdown"><a href="/">Home</a>
                                        </li>
                                        <li className="dropdown"><a href="/about">About</a>
                                            
                                        </li>
                                        <li className="dropdown"><a href="/services">Services</a>
                                        </li>
                                        <li><a href="/contact">Contact</a></li>
                                         {isAdminOrManager && (
                                        <li>
                                         <Link to="/admin">Admin</Link>
                                       </li>
                       )}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                        <div className="search-btn"></div>
                        {isLogged ? (
                  <div className="link-btn">
                    <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut} >Log out</Link>
                  </div>
                ) : (
                  <div className="link-btn">
                    <Link to="/login" className="theme-btn btn-style-one">Login</Link>
                  </div>
                )}
                    </div>                        
                </div>
            </div>
        </div>
      

    
        <div className="sticky-header">
         
            <div className="header-upper">
                <div className="auto-container">
                    <div className="inner-container">
                 
                        <div className="logo-box">
                            <div className="logo"><a href="index.html"><img src="assets/images/loggo.jpg" alt="" /></a></div>
                        </div>
                        <div className="right-column">
                          
                            <div className="nav-outer">
                               
                                <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" /></div>

                          
                                <nav className="main-menu navbar-expand-md navbar-light">
                                </nav>
                            </div>
                            <div className="search-btn"></div>
                            <div className="link-btn"><a href="/login" className="theme-btn btn-style-one">Login </a></div>
                        </div>                        
                    </div>
                </div>
            </div>
     
        </div>



        <div className="nav-overlay">
            <div className="cursor"></div>
            <div className="cursor-follower"></div>
        </div>
    </header>
    </div>
  )
}

export default Header

