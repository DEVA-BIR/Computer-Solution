const api_url = import.meta.env.VITE_API_URL;

// ADD device
const adddevice = async (deviceData) => {
  try {
    const response = await fetch(`${api_url}/api/device`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deviceData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add device");
    }

    return data;

  } catch (error) {
    console.log("device Service Error:", error);
    throw error;
  }
};

// GET deviceS BY CUSTOMER (FIXED)
const getdevicesByCustomer = async (customer_id) => {
  try {
    const response = await fetch(
      `${api_url}/api/device/${customer_id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch devices");
    }

    return data;

  } catch (error) {
    console.log("device Fetch Error:", error);
    throw error;
  }
};
const deletedevice = async (deviceId) => {
  if (!deviceId) {
    throw new Error("deviceId is undefined");
  }

  const response = await fetch(
    `${api_url}/api/device/${deviceId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Delete failed");
  }

  return data;
};
const deviceService = {
  adddevice,
  getdevicesByCustomer,
  deletedevice,
};

export default deviceService;