import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTools,
  FaUserTie,
  FaClipboardList,
  FaCar,
} from "react-icons/fa";

const AdminDashboardBody = () => {
  const navigate = useNavigate();

  const cards = [
    {
      small: "ORDER MANAGEMENT",
      title: "Orders",
      link: "LIST OF ORDERS +",
      path: "/admin/Order",
      icon: <FaCar />,
    },
    {
      small: "ORDER SERVICES",
      title: "New Orders",
      link: "ADD ORDER +",
      path: "/admin/AddOrder",
      icon: <FaClipboardList />,
    },
    {
      small: "EMPLOYEE MANAGEMENT",
      title: "Employees",
      link: "LIST OF EMPLOYEES +",
      path: "/admin/employees",
      icon: <FaUserTie />,
    },
    {
      small: "EMPLOYEE SERVICES",
      title: "New Employee",
      link: "Add Employee +",
      path: "/admin/AddEmployee",
      icon: <FaClipboardList />,
    },
    {
      small: "OUR CUSTOMERS",
      title: "Customers",
      link: "Customers List",
      path: "/admin/customers",
      icon: <FaUserTie />,
    },
    {
      small: "CUSTOMER SERVICES",
      title: "New Customer",
      link: "Add Customer +",
      path: "/admin/AddCustomer",
      icon:<FaClipboardList />,
    },
    {
      small: "VEHICLE SERVICES",
      title: "New Vehicle",
      link: "Add Vehicle +",
      path: "/admin/VehicleInfo",
      icon: <FaCar />,
    },
    {
      small: "ADMIN SERVICES",
      title: "Admin Services",
      link: "Admin Services",
      path: "/admin/AdminService",
      icon: <FaTools />,
    },
    {
      small: "SERVICE DETAILS",
      title: "Service Details",
      link: "Service Details",
      path: "/admin/ServiceDetails",
      icon: <FaCar />,
    },
  ];

  return (
    <div className="dashboard-body">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>

          <p>
            Bring to the table win-win survival strategies to ensure
            proactive domination. At the end of the day, going forward,
            a new normal that has evolved from generation X is on the
            runway heading towards a streamlined cloud solution.
          </p>
        </div>

        {/* Cards */}
        <div className="dashboard-grid">
          {cards.map((card, index) => (
            <div
              key={index}
              className="dashboard-card"
              onClick={() => {

  navigate(card.path);
}}
              style={{ cursor: "pointer" }}
            >
              
              <div>
                <small>{card.small}</small>
                <h3>{card.title}</h3>
                <span>{card.link}</span>
              </div>

              <div className="card-icon">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardBody;