import React from 'react';
import { useAuth } from '../../Context/AuthContxt';
import ManagerMenu from "../Component/Admin/ManagerMenu";
import LoginForm from '../Component/LoginForm/LoginForm';
import ManagerDashBoard from './ManagerDashBoard';


   function Managerial() {
  // Destructure the auth hook 
  const { isLogged, isManager } = useAuth();

  if (isLogged) {


    if (isManager) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <ManagerMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <ManagerDashBoard />
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

export default Managerial;