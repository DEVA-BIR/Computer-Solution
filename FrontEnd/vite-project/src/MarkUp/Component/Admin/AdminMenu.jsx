import React from 'react';
import { Link } from 'react-router-dom';
function AdminMenu(props) {
  return (
    <div>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">Dashboard</Link>
        <Link to="/admin/order" className="list-group-item">Orders</Link>
        <Link to="/admin/AddOrder" className="list-group-item">New order</Link>
        <Link to="/admin/AddEmployee" className="list-group-item">Add employee</Link>
        <Link to="/admin/employees" className="list-group-item">Employees</Link>
        <Link to="/admin/AddCustomer" className="list-group-item">Add customer</Link>
        <Link to="/admin/customers" className="list-group-item">Customers</Link>
        <Link to="/admin/AdminService" className="list-group-item">Services</Link>
      </div>
    </div>
  );
}

export default AdminMenu;