import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

// Edit Profile
const editProfile = async (accountData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.put(
    API_URL + "editProfile",
    accountData,
    config
  );

  return data;
};

const profileServer = {
  editProfile,
};

export default profileServer;
