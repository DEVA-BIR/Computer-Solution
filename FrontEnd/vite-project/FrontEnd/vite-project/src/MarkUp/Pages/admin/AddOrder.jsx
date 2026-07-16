import React from 'react';
// Import the AddEmployeeForm component 
import AddOrderForm from '../../Component/Admin/AddOrder/AddOrderForm';
// Import the AdminMenu component 
import AdminMenu from '../../Component/Admin/AdminMenu';

function AddOrder(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
          <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddOrderForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrder;