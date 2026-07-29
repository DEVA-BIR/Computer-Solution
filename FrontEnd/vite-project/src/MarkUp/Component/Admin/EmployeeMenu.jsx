import React from 'react';
import { Link } from 'react-router-dom';
function EmployeeMenu(props) {
  return (
    <div>
      <div className="admin-menu">
        <h2>Employee Menu</h2>
      </div>
      <div className="list-group">
        <Link to="/employeer" className="list-group-item">Dashboard</Link>
        <Link to="/admin/order" className="list-group-item">Orders</Link>
        <Link to="/admin/AddOrder" className="list-group-item">New order</Link>
        <Link to="/admin/AddCustomer" className="list-group-item">Add customer</Link>
        <Link to="/admin/customers" className="list-group-item">Customers</Link>
      </div>
    </div>
  );
}

export default EmployeeMenu;