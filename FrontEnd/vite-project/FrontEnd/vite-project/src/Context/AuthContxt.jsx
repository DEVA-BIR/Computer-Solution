// Import React and the Hooks we need here 
import React, { useState, useEffect, useContext } from "react";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../Utilty/Auth';
// Create a context object  
const AuthContext = React.createContext();
// Create a custom hook to use the context
export const useAuth = () => {
  return useContext(AuthContext);
}
// Create a provider component  
export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [customer, setCustomer] = useState(null);
const logout = () => {
  localStorage.removeItem("employee");
  setIsLogged(false);
  setIsAdmin(false);
  setEmployee(null);

  window.location.href = "/login";
};
  const value = {
  isLogged,
  isAdmin,
  setIsAdmin,
  setIsLogged,
  employee,
  customer,
  logout,
};

  useEffect(() => {
    // Retrieve the logged in user from local storage
    const loggedInEmployee = getAuth();
    // console.log(loggedInEmployee);
    loggedInEmployee.then((response) => {
      // console.log(response);
      if (response.employee_token) {
        setIsLogged(true);
        // 3 is the employee_role for admin
        if (response.employee_role === 3) {
          setIsAdmin(true);
        }
        setEmployee(response);
      }
    });
  }, []);
  useEffect(() => {
  if (!isLogged) return;

  let timeout;

  const resetTimer = () => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      alert("Session expired due to inactivity");
      logout();
    }, 30 * 60 * 1000); // 30 minutes
  };

  window.addEventListener("mousemove", resetTimer);
  window.addEventListener("keydown", resetTimer);
  window.addEventListener("click", resetTimer);
  window.addEventListener("scroll", resetTimer);

  resetTimer();

  return () => {
    clearTimeout(timeout);
    window.removeEventListener("mousemove", resetTimer);
    window.removeEventListener("keydown", resetTimer);
    window.removeEventListener("click", resetTimer);
    window.removeEventListener("scroll", resetTimer);
  };
}, [isLogged]);
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

