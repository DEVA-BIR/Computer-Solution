import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { format } from "date-fns";
import { useAuth } from "../../../../Context/AuthContxt.jsx";
import employeeService from "../../../../Services/employee.service.jsx";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(employees.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentEmployees = employees.slice(
    startIndex,
    startIndex + itemsPerPage
  );

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

        console.log("Employee deleted");
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

            <h2>Employees</h2>

<p className="fw-bold fs-5">
  Total Employees: {employees.length}
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

              <tbody>
               {currentEmployees.map((emp, index) => (
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

                    {/* ✅ FIXED BUTTONS LIKE CUSTOMER LIST */}
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

export default EmployeesList;