import React from 'react';
// Import the AddEmployeeForm component 
import AddEmployeeForm from '../../Component/Admin/AddEmployee/AddEmployeeForm';
// Import the AdminMenu component 
import AdminMenu from '../../Component/Admin/AdminMenu';

function AddEmployee(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
          <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <AddEmployeeForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmployee;
