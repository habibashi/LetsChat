import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

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
};

export default GroupsService;
