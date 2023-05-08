import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GroupsServer from "./GroupServer";

const initialState = {
  groups: [],
  isError: false,
  isSuccess: false,
  isLoad: false,
  message: "",
};

// Groups
export const getGroups = createAsyncThunk(
  "groups/getGroups",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await GroupsServer.getGroups(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoad = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroups.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoad = false;
        state.isSuccess = true;
        state.groups = action.payload;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = groupsSlice.actions;
export default groupsSlice.reducer;
