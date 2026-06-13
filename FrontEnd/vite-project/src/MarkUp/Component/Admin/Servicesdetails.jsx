import React from 'react';
import { useAuth } from '../../../Context/AuthContxt';
import LoginForm from '../../Component/LoginForm/LoginForm';
import ServiceDetail from '../ServiceDetail';


   function ServiceDetails() {
  // Destructure the auth hook
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">

              <div className="col-md-12 admin-right-side">
                <ServiceDetail />
              </div>
            </div>
          </div>
        </div>
      );

}

export default ServiceDetails;