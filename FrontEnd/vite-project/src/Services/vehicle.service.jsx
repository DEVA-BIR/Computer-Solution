const api_url = import.meta.env.VITE_API_URL;

// ADD VEHICLE
const addVehicle = async (vehicleData) => {
  try {
    const response = await fetch(`${api_url}/api/vehicle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to add vehicle");
    }

    return data;

  } catch (error) {
    console.log("Vehicle Service Error:", error);
    throw error;
  }
};

// GET VEHICLES BY CUSTOMER (FIXED)
const getVehiclesByCustomer = async (customer_id) => {
  try {
    const response = await fetch(
      `${api_url}/api/vehicle/${customer_id}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch vehicles");
    }

    return data;

  } catch (error) {
    console.log("Vehicle Fetch Error:", error);
    throw error;
  }
};
const deleteVehicle = async (vehicleId) => {
  if (!vehicleId) {
    throw new Error("vehicleId is undefined");
  }

  const response = await fetch(
    `${api_url}/api/vehicle/${vehicleId}`,
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
const vehicleService = {
  addVehicle,
  getVehiclesByCustomer,
  deleteVehicle,
};

export default vehicleService;