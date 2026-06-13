import React from 'react'
import { useAuth } from '../.../../../../Context/AuthContxt'
import LoginForm from '../../Component/LoginForm/LoginForm';
import AdminMenu from "../../Component/Admin/AdminMenu";
import CustomerList from './CustomerList/CustomerList';

     function Customers() {
      // Destructure the auth hook 
      const { isLogged, isAdmin } = useAuth();
    
      if (isLogged) {
    
    
        if (isAdmin) {
          return (
            <div>
              <div className="container-fluid admin-pages">
                <div className="row">
                  <div className="col-md-3 admin-left-side">
                    <AdminMenu />
                  </div>
                  <div className="col-md-9 admin-right-side">
                    <CustomerList />
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
    
    export default Customers;