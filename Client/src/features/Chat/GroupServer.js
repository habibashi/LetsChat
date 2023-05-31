import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Create Message
const createGroupMessage = async (form, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(
    API_URL + "createGroupMessage",
    form,
    config
  );

  return data;
};

// Get User By Id
const getGroupMessages = async (room_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(
    API_URL + `groupChatPage/${room_id}`,
    config
  );
  return data;
};

// Get groups
const getGroups = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL + "getGroupCompany", config);
  return data;
};

const GroupsService = {
  getGroups,
  getGroupMessages,
  createGroupMessage,
};

export default GroupsService;
