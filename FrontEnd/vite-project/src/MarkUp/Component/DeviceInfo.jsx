import React from 'react';
import { useAuth } from '../../Context/AuthContxt';
import AdminMenu from "./Admin/AdminMenu";
import LoginForm from './LoginForm/LoginForm';
import AdminDashBoard from './AdminDashBoard';
import Adddevice from './Admin/Adddevice/Adddevice'; 


   function deviceInfo() {
  // Destructure the auth hook 
  const { isLogged, isAdmin, isManager, isEmployee } = useAuth();

  if (isLogged) {


    if (isAdmin || isManager || isEmployee) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <Adddevice />
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

export default deviceInfo;