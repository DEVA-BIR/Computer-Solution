const api_url = import.meta.env.VITE_API_URL;

// CREATE ORDER
async function createOrder(orderData, token) {
  const response = await fetch(`${api_url}/api/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create order");
  }

  return data;
}

// GET ALL ORDERS
async function getAllOrders(token) {
  const response = await fetch(`${api_url}/api/order`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch orders");
  }

  const data = result.data;
  return Array.isArray(data) ? data : [data];
}

// GET SINGLE ORDER
async function getSingleOrder(id, token) {
  const response = await fetch(`${api_url}/api/order/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch order");
  }

  return data;
}

/////////////////////////////////////////
// ✅ ADD THIS: UPDATE ORDER
/////////////////////////////////////////
async function updateOrder(id, orderData, token) {
  const response = await fetch(`${api_url}/api/order/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update order");
  }

  return data;
}

/////////////////////////////////////////
// ✅ ADD THIS: DELETE ORDER
/////////////////////////////////////////
async function deleteOrder(id, token) {
  const response = await fetch(`${api_url}/api/order/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete order");
  }

  return data;
}

const orderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};

export default orderService;