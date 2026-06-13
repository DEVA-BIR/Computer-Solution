import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../Context/AuthContxt.jsx";
import customerService from "../../../../Services/customer.service.jsx";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(customers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCustomers = customers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const { employee } = useAuth();
  const navigate = useNavigate();

  const token = employee?.employee_token || null;

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await customerService.getAllCustomers(token);
        const data = await res.json();

        setCustomers(data.data);
      } catch (err) {
        setApiError(true);
        setApiErrorMessage("Failed to load customers");
      }
    }

    fetchCustomers();
  }, [token]);

  const handleCustomerClick = (customer) => {
    navigate("/admin/VehicleInfo", {
      state: customer,
    });
  };

  const handleEdit = (customer) => {
    navigate(`/admin/customer/edit/${customer.customer_id}`, {
      state: customer,
    });
  };

  const handleDelete = async (customerId) => {
    try {
      const response = await customerService.deleteCustomer(customerId, token);
      const data = await response.json();

      if (response.ok) {
        setCustomers((prev) =>
          prev.filter((c) => c.customer_id !== customerId)
        );

        setSuccessMsg(data.message || "Customer deleted successfully");
        setErrorMsg(null);

        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg(data.error);
      }
    } catch (error) {
      setErrorMsg("Delete failed");
    }
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <h2>{apiErrorMessage}</h2>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="auto-container">

           <h2>Customers</h2>

<p className="fw-bold fs-5">
  Total Customers: {customers.length}
</p>

            {successMsg && (
              <div style={{ color: "green", marginBottom: 10 }}>
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div style={{ color: "red", marginBottom: 10 }}>
                {errorMsg}
              </div>
            )}

            <Table striped bordered hover>
              <thead>
                <tr>
  <th>No.</th>
  <th>ID</th>
  <th>First Name</th>
  <th>Last Name</th>
  <th>Email</th>
  <th>Phone</th>
  <th>Date</th>
  <th>Active</th>
  <th>Edit/Delete</th>
</tr>
              </thead>

              <tbody>
                {currentCustomers.map((customer, index) => (
                 <tr key={customer.customer_id}>
  <td>{startIndex + index + 1}</td>

  <td
    style={{ cursor: "pointer", color: "#000000" }}
    onClick={() => handleCustomerClick(customer)}
  >
    {customer.customer_id}
  </td>

                    <td onClick={() => handleCustomerClick(customer)}>
                      {customer.customer_first_name}
                    </td>

                    <td>{customer.customer_last_name}</td>
                    <td>{customer.customer_email}</td>
                    <td>{customer.customer_phone_number}</td>

                    <td>
                      {format(
                        new Date(customer.customer_added_date),
                        "MM-dd-yyyy | kk:mm"
                      )}
                    </td>

                    <td>
                      {customer.active_customer_status ? "Yes" : "No"}
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <FaEdit
                          style={{ cursor: "pointer", color: "#0d6efd" }}
                          onClick={() => handleEdit(customer)}
                        />

                        <FaTrash
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={() =>
                            handleDelete(customer.customer_id)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
         {/* PAGINATION */}
<div className="pagination">

                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  « First
                </button>

                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ‹ Previous
                </button>

                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next ›
                </button>

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  Last »
                </button>

              </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomerList;