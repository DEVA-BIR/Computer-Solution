import React, { useEffect, useState } from "react";
import { FaEdit, FaExternalLinkAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import orderService from "../../../../Services/order.service";

function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const navigate = useNavigate();

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const currentOrders = orders.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    fetchOrders();
  }, []);

  // GET ALL ORDERS
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

  // DELETE ORDER (NEW)
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
        return <span className="badge bg-warning text-dark">In Progress</span>;
      case 3:
        return <span className="badge bg-success">Completed</span>;
      default:
        return <span className="badge bg-dark">Unknown</span>;
    }
  };

  return (
    <div
      className="container-fluid py-5"
      style={{ backgroundColor: "#f5f5f7", minHeight: "100vh" }}
    >
      <div className="container">
        <h1 style={{ color: "#0b1c5d", fontWeight: "700" }}>
  Orders
</h1>

<p className="fw-bold fs-5">
  Total Orders: {orders.length}
</p>

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
        <th>Vehicle</th>
        <th>Order Date</th>
        <th>Received By</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {loading ? (
        <tr>
          <td colSpan="8" className="text-center">
            Loading...
          </td>
        </tr>
      ) : orders.length > 0 ? (
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
              <div>{order.customer_phone_number || "N/A"}</div>
            </td>

            <td>
              <div>
                {order.vehicle_make || "N/A"}{" "}
                {order.vehicle_model || "N/A"}
              </div>
              <div>{order.vehicle_year || "N/A"}</div>
              <div>{order.vehicle_tag || "N/A"}</div>
            </td>

            <td>
              {order.order_date
                ? new Date(order.order_date).toLocaleDateString()
                : "N/A"}
            </td>

            <td>
              {order.employee_first_name}{" "}
              {order.employee_last_name}
            </td>

            <td>{getStatusBadge(order.order_status)}</td>

            <td>
              <div className="d-flex gap-3 align-items-center">
                <FaEdit
                  onClick={() =>
                    navigate(`/admin/order/edit/${order.order_id}`)
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
          <td colSpan="8" className="text-center">
            No Orders Found
          </td>
        </tr>
      )}
    </tbody>
  </table>

  <div className="pagination">
    <button
      onClick={() => setCurrentPage(1)}
      disabled={currentPage === 1}
    >
      « First
    </button>

    <button
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      disabled={currentPage === 1}
    >
      ‹ Previous
    </button>

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
</div>
      </div>
    </div>
  );
}

export default OrdersList;