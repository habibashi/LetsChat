import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Create Account
const createAccount = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    API_URL + "createAccount",
    accountData,
    config
  );

  return data;
};

// Create Company
const createCompany = async (companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    API_URL + "createCompany",
    companyData,
    config
  );

  return data;
};

// Get All Companies
const getCompanies = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "getAllCompany", config);
  return data;
};

// Active Company
const activeCompany = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    API_URL + "activeCompany",
    accountData,
    config
  );

  return data;
};

const AdminService = {
  createAccount,
  createCompany,
  getCompanies,
  activeCompany,
};

export default AdminService;
