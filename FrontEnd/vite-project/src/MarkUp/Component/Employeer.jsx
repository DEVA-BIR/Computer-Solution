import React from 'react';
import { useAuth } from '../../Context/AuthContxt';
import EmployeeMenu from "../Component/Admin/EmployeeMenu";
import LoginForm from '../Component/LoginForm/LoginForm';
import EmployeeDashBoard from './EmployeeDashBoard';


   function Employeer() {
  // Destructure the auth hook 
  const { isLogged, isEmployee } = useAuth();
  if (isLogged) {


    if (isEmployee) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <EmployeeMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EmployeeDashBoard />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>You are not authorized to access this page</h1>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }

}

export default Employeer;