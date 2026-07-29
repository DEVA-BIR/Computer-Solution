import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../Context/AuthContxt.jsx";
import customerService from "../../../../Services/customer.service.jsx";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { employee } = useAuth();
  const navigate = useNavigate();

  const token = employee?.employee_token || null;

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const res = await customerService.getAllCustomers(token);
        const data = await res.json();

        setCustomers(data.data || []);
      } catch (err) {
        setApiError(true);
        setApiErrorMessage("Failed to load customers");
      }
    }

    fetchCustomers();
  }, [token]);

  // ================= SEARCH =================
  // ================= SEARCH =================
const filteredCustomers = customers.filter((customer) => {
  const search = searchTerm.toLowerCase();

  return (
    String(customer.customer_id || "")
      .toLowerCase()
      .includes(search) ||

    String(customer.customer_first_name || "")
      .toLowerCase()
      .includes(search) ||

    String(customer.customer_last_name || "")
      .toLowerCase()
      .includes(search) ||

    String(customer.customer_email || "")
      .toLowerCase()
      .includes(search) ||

    String(customer.customer_phone_number || "")
      .toLowerCase()
      .includes(search) ||

    (customer.active_customer_status ? "yes" : "no")
      .includes(search)||
    String(customer.customer_added_date || "")      .toLowerCase()
      .includes(search)
  );
});

  // ================= PAGINATION =================
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCustomerClick = (customer) => {
    navigate("/admin/DeviceInfo", {
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2>Customers</h2>
                <p className="fw-bold fs-5">
                  Total Customers: {filteredCustomers.length}
                </p>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "320px",
                  maxWidth: "100%",
                }}
              >
                <FaSearch
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "12px",
                    transform: "translateY(-50%)",
                    color: "#888",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search by ID, Name, Email or Phone..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 15px 10px 40px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    outline: "none",
                  }}
                />
              </div>
            </div>

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

            <div className="table-responsive">
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

                <tbody>                {currentCustomers.length > 0 ? (
                  currentCustomers.map((customer, index) => (
                    <tr key={customer.customer_id}>
                      <td>{startIndex + index + 1}</td>

                      <td
                        style={{ cursor: "pointer", color: "#000000" }}
                        onClick={() => handleCustomerClick(customer)}
                      >
                        {customer.customer_id}
                      </td>

                      <td
                        style={{ cursor: "pointer" }}
                        onClick={() => handleCustomerClick(customer)}
                      >
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
                        <div
                          style={{
                            display: "flex",
                            gap: "10px",
                            justifyContent: "center",
                          }}
                        >
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              color: "#0d6efd",
                            }}
                            onClick={() => handleEdit(customer)}
                          />

                          <FaTrash
                            style={{
                              cursor: "pointer",
                              color: "red",
                            }}
                            onClick={() =>
                              handleDelete(customer.customer_id)
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      style={{
                        textAlign: "center",
                        padding: "25px",
                        fontWeight: "bold",
                        color: "#777",
                      }}
                    >
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* PAGINATION */}

            {filteredCustomers.length > 0 && (
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

                <span
                  style={{
                    padding: "8px 15px",
                    fontWeight: "bold",
                  }}
                >
                  Page {currentPage} of {totalPages}
                </span>

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
            )}
          </div>
        </div>
      </section>
    )}
  </>
);
};

export default CustomerList;
