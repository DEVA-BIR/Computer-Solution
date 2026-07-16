const api_url = import.meta.env.VITE_API_URL;

// ADD SERVICE
const addService = async (serviceData) => {

  try {

    const response = await fetch(
      `${api_url}/api/service`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(serviceData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;

  } catch (error) {

    console.log("Add Service Error:", error);

    throw error;
  }
};

// GET SERVICES
const getServices = async () => {

  try {

    const response = await fetch(
      `${api_url}/api/service`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;

  } catch (error) {

    console.log("Get Services Error:", error);

    throw error;
  }
};

// UPDATE SERVICE
const updateService = async (
  service_id,
  serviceData
) => {

  try {

    const response = await fetch(
      `${api_url}/api/service/${service_id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(serviceData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;

  } catch (error) {

    console.log("Update Service Error:", error);

    throw error;
  }
};

// DELETE SERVICE
const deleteService = async (service_id) => {

  try {

    const response = await fetch(
      `${api_url}/api/service/${service_id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return data;

  } catch (error) {

    console.log("Delete Service Error:", error);

    throw error;
  }
};

const serviceService = {
  addService,
  getServices,
  updateService,
  deleteService,
};

export default serviceService;