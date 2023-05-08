import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/users/";

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  console.log(response.data);
  return response.data;
};

const authService = {
  logout,
  login,
};

export default authService;
