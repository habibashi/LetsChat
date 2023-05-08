import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import adminReducer from "../features/Admin/AdminSlice";
import managerReducer from "../features/Manager/managerSlice";
import peopleReducer from "../features/Chat/PeopleSlice";
import groupsReducer from "../features/Chat/GroupsSlice";
import profileReducer from "../features/Profile/ProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    manager: managerReducer,
    people: peopleReducer,
    groups: groupsReducer,
    profile: profileReducer,
  },
});
