import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

const editCompany = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    API_URL + "editCompany",
    accountData,
    config
  );

  return data;
};

// Active Users
const activeUsers = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    API_URL + "activeUsers",
    accountData,
    config
  );

  return data;
};

// Get active Users
const getActiveUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "getActiveUsers", config);
  return data;
};

const managerServer = {
  editCompany,
  activeUsers,
  getActiveUsers,
};

export default managerServer;
