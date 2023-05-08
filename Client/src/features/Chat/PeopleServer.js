import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Get Admin Users
const getAdminUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "adminUsers", config);
  return data;
};

// Get Admin Users
const getEmployeeManagerUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "employeeManagerUsers", config);
  return data;
};

// Get People Search
const getPeople = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + `people?search=${search}`, config);
  return data;
};

// Get admin People Search
const getAdminPeople = async (search, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    API_URL + `adminPeople?search=${search}`,
    config
  );
  return data;
};

const PeopleService = {
  getPeople,
  getAdminPeople,
  getAdminUsers,
  getEmployeeManagerUsers,
};

export default PeopleService;
