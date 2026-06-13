const api_url = import.meta.env.VITE_API_URL;

// CREATE
const createCustomer = async (formData, loggedInCustomerToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInCustomerToken,
    },
    body: JSON.stringify(formData),
  };

  return fetch(`${api_url}/api/customers`, requestOptions);
};

// GET ALL
const getAllCustomers = async (token) => {
  return fetch(`${api_url}/api/customers`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

// UPDATE
const updateCustomer = async (customerId, formData, token) => {
  return fetch(`${api_url}/api/customers/${customerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
};

// DELETE
const deleteCustomer = async (customerId, token) => {
  return fetch(`${api_url}/api/customers/${customerId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};

export default customerService;