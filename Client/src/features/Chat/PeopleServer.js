import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Create Message
const createMessage = async (form, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL + "message", form, config);

  return data;
};

// Get User By Id
const getRoom = async (room_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    API_URL + `peopleChatPage/${room_id}`,
    config
  );
  return data;
};

// Get Admin Users
const getAdminUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "adminPeopleRooms", config);
  return data;
};

// Get Admin Users
const getEmployeeManagerUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "peopleRooms", config);
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
  getRoom,
  createMessage,
};

export default PeopleService;
