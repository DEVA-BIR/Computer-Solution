const api_url = import.meta.env.VITE_API_URL;

const logIn = async (formData) => {

  const response = await fetch(`${api_url}/api/login`, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(formData),
  });

  const data = await response.json();

  return data;
};

const logOut = () => {

  localStorage.removeItem("employee");
};

export default {
  logIn,
  logOut,
};