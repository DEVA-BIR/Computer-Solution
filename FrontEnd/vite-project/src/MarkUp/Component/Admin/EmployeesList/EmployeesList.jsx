import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../Context/AuthContxt.jsx";
import employeeService from "../../../../Services/employee.service.jsx";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
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
    employeeService
      .getAllEmployees(token)
      .then((res) => {
        if (!res.ok) {
          setApiError(true);
          setApiErrorMessage("Failed to load employees");
        }
        return res.json();
      })
      .then((data) => {
        setEmployees(data.data || []);
      })
      .catch((err) => {
        console.log(err);
        setApiError(true);
        setApiErrorMessage("Server error");
      });
  }, [token]);

  // SEARCH
  const filteredEmployees = employees.filter((emp) => {
    const search = searchTerm.toLowerCase();

    return (
      emp.employee_id.toString().includes(search) ||
      emp.employee_first_name.toLowerCase().includes(search) ||
      emp.employee_last_name.toLowerCase().includes(search) ||
      emp.employee_email.toLowerCase().includes(search) ||
      emp.employee_phone.toLowerCase().includes(search) ||
      emp.company_role_name.toLowerCase().includes(search)||
      emp.added_date.toLowerCase().includes(search)||
      (emp.active_employee ? "yes" : "no").includes(search)
    );
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentEmployees = filteredEmployees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleEdit = (emp) => {
    navigate(`/admin/employee/edit/${emp.employee_id}`, {
      state: emp,
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await employeeService.deleteEmployee(id, token);
      const data = await res.json();

      if (res.ok) {
        setEmployees((prev) =>
          prev.filter((e) => e.employee_id !== id)
        );

        setSuccessMsg(data.message || "Employee deleted successfully");
        setErrorMsg(null);
      } else {
        setErrorMsg(data.error);
        setSuccessMsg(null);
      }
    } catch (err) {
      console.log(err);
      setErrorMsg("Delete failed");
      setSuccessMsg(null);
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
                <h2>Employees</h2>

                <p className="fw-bold fs-5">
                  Total Employees: {filteredEmployees.length}
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
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#888",
                  }}
                />

                <input
                  type="text"
                  placeholder="Search employee..."
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
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>

                <tbody>                {currentEmployees.length > 0 ? (
                  currentEmployees.map((emp, index) => (
                    <tr key={emp.employee_id}>
                      <td>{startIndex + index + 1}</td>

                      <td>{emp.active_employee ? "Yes" : "No"}</td>

                      <td>{emp.employee_first_name}</td>

                      <td>{emp.employee_last_name}</td>

                      <td>{emp.employee_email}</td>

                      <td>{emp.employee_phone}</td>

                      <td>
                        {format(
                          new Date(emp.added_date),
                          "MM-dd-yyyy | kk:mm"
                        )}
                      </td>

                      <td>{emp.company_role_name}</td>

                      <td>
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <FaEdit
                            style={{
                              cursor: "pointer",
                              color: "#0d6efd",
                            }}
                            title="Edit Employee"
                            onClick={() => handleEdit(emp)}
                          />

                          <FaTrash
                            style={{
                              cursor: "pointer",
                              color: "red",
                            }}
                            title="Delete Employee"
                            onClick={() =>
                              handleDelete(emp.employee_id)
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
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* PAGINATION */}
            {filteredEmployees.length > 0 && (
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

export default EmployeesList;