import React from "react";
import {
  FaTools,
  FaUserTie,
  FaClipboardList,
  FaCar,
} from "react-icons/fa";

const AdminDashboardBody = () => {
  const cards = [
    {
      small: "OPEN FOR ALL",
      title: "All Orders",
      link: "LIST OF ORDERS +",
      icon: <FaClipboardList />,
    },
    {
      small: "OPEN FOR LEADS",
      title: "New Orders",
      link: "ADD ORDER +",
      icon: <FaCar />,
    },
    {
      small: "OPEN FOR ADMINS",
      title: "Employees",
      link: "LIST OF EMPLOYEES +",
      icon: <FaUserTie />,
    },
    {
      small: "OPEN FOR ADMINS",
      title: "Add Employee",
      link: "READ MORE +",
      icon: <FaUserTie />,
    },
    {
      small: "SERVICE AND REPAIRS",
      title: "Engine Service & Repair",
      link: "READ MORE +",
      icon: <FaTools />,
    },
    {
      small: "SERVICE AND REPAIRS",
      title: "Tyre & Wheels",
      link: "READ MORE +",
      icon: <FaCar />,
    },
    {
      small: "SERVICE AND REPAIRS",
      title: "Denting & Painting",
      link: "READ MORE +",
      icon: <FaTools />,
    },
    {
      small: "SERVICE AND REPAIRS",
      title: "Engine Service & Repair",
      link: "READ MORE +",
      icon: <FaTools />,
    },
    {
      small: "SERVICE AND REPAIRS",
      title: "Tyre & Wheels",
      link: "READ MORE +",
      icon: <FaCar />,
    },
  ];

  return (
    <>
      <div className="dashboard-body">
        <div className="dashboard-container">
          {/* TITLE */}
          <div className="dashboard-header">
            <h1>Admin Dashboard</h1>

            <p>
              Bring to the table win-win survival strategies to ensure
              proactive domination. At the end of the day, going forward,
              a new normal that has evolved from generation X is on the
              runway heading towards a streamlined cloud solution.
            </p>
          </div>

          {/* CARDS */}
          <div className="dashboard-grid">
            {cards.map((card, index) => (
              <div className="dashboard-card" key={index}>
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


    </>
  );
};

export default AdminDashboardBody;