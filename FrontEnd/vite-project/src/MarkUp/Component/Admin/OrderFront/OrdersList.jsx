import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import orderService from "../../../../Services/order.service";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= GET ORDERS =================
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const data = await orderService.getAllOrders(token);

      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (error) {
      console.log("FETCH ORDERS ERROR:", error.message);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================
  const filteredOrders = orders.filter((order) => {
    const search = searchTerm.toLowerCase();

    return (
      order.order_id.toString().includes(search) ||

      `${order.customer_first_name || ""} ${order.customer_last_name || ""}`
        .toLowerCase()
        .includes(search) ||

      (order.customer_email || "")
        .toLowerCase()
        .includes(search) ||

      (order.customer_phone_number || "")
        .toLowerCase()
        .includes(search) ||

      (order.device_make || "")
        .toLowerCase()
        .includes(search) ||

      (order.device_model || "")
        .toLowerCase()
        .includes(search) ||

      (order.device_brand || "")
        .toLowerCase()
        .includes(search) ||

      `${order.employee_first_name || ""} ${order.employee_last_name || ""}`
        .toLowerCase()
        .includes(search)||
      (order.order_date
        ? new Date(order.order_date)
            .toLocaleDateString()
            .toLowerCase()
            .includes(search)
        : false)||
      (order.order_status
        ? order.order_status.toString().includes(search)
        : false)
    );
  });

  // ================= PAGINATION =================
  const totalPages = Math.ceil(
    filteredOrders.length / itemsPerPage
  );

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await orderService.deleteOrder(id, token);

      setOrders((prev) =>
        prev.filter((order) => order.order_id !== id)
      );

      setSuccessMessage("Order deleted successfully");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.log("DELETE ERROR:", error);
    }
  };

  const getStatusBadge = (status) => {
    switch (Number(status)) {
      case 1:
        return <span className="badge bg-secondary">Received</span>;
      case 2:
        return (
          <span className="badge bg-warning text-dark">
            In Progress
          </span>
        );
      case 3:
        return (
          <span className="badge bg-success">
            Completed
          </span>
        );
      default:
        return (
          <span className="badge bg-dark">
            Unknown
          </span>
        );
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        backgroundColor: "#111111",
        minHeight: "100vh",
      }}
    >
      <div className="container">

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
            <h1
              style={{
                color: "#0b1c5d",
                fontWeight: "700",
              }}
            >
              Orders
            </h1>

            <p className="fw-bold fs-5">
              Total Orders: {filteredOrders.length}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              width: "330px",
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
              placeholder="Search orders..."
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

        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered bg-white">
            <thead>
              <tr>
                <th>No.</th>
                <th>Order Id</th>
                <th>Customer</th>
                <th>device</th>
                <th>Order Date</th>
                <th>Received By</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredOrders.length > 0 ? (
                currentOrders.map((order, index) => (
                  <tr key={order.order_id}>
                    <td>{startIndex + index + 1}</td>

                    <td>{order.order_id}</td>

                    <td>
                      <div>
                        {order.customer_first_name || "N/A"}{" "}
                        {order.customer_last_name || "N/A"}
                      </div>

                      <div>{order.customer_email || "N/A"}</div>

                      <div>
                        {order.customer_phone_number || "N/A"}
                      </div>
                    </td>

                    <td>
                      <div>
                        {order.device_make || "N/A"}{" "}
                        {order.device_model || "N/A"}
                      </div>

                      <div>{order.device_year || "N/A"}</div>

                      <div>{order.device_brand || "N/A"}</div>
                    </td>

                    <td>
                      {order.order_date
                        ? new Date(
                            order.order_date
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td>
                      {order.employee_first_name}{" "}
                      {order.employee_last_name}
                    </td>

                    <td>
                      {getStatusBadge(order.order_status)}
                    </td>

                    <td>
                      <div className="d-flex gap-3 align-items-center">
                        <FaEdit
                          onClick={() =>
                            navigate(
                              `/admin/order/edit/${order.order_id}`
                            )
                          }
                          style={{
                            cursor: "pointer",
                            color: "#0d6efd",
                          }}
                        />

                        <FaTrash
                          onClick={() =>
                            handleDelete(order.order_id)
                          }
                          style={{
                            cursor: "pointer",
                            color: "red",
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    style={{
                      textAlign: "center",
                      padding: "25px",
                      fontWeight: "bold",
                      color: "#777",
                    }}
                  >
                    No Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          {filteredOrders.length > 0 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                « First
              </button>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.max(prev - 1, 1)
                  )
                }
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
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
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
    </div>
  );
}

export default OrdersList;
