import React from 'react';

function AdminMenu(props) {
  return (
    <div>
      <div className="admin-menu">
        <h2>Admin Menu</h2>
      </div>
      <div className="list-group">
        <a href="/admin" className="list-group-item">Dashboard</a>
        <a href="/admin/order" className="list-group-item">Orders</a>
        <a href="/admin/AddOrder" className="list-group-item">New order</a>
        <a href="/admin/AddEmployee" className="list-group-item">Add employee</a>
        <a href="/admin/employees" className="list-group-item">Employees</a>
        <a href="/admin/AddCustomer" className="list-group-item">Add customer</a>
        <a href="/admin/customers" className="list-group-item">Customers</a>
        <a href="/admin/AdminService" className="list-group-item">Services</a>
      </div>
    </div>
  );
}

export default AdminMenu;