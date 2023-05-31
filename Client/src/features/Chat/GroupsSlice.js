import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import GroupsServer from "./GroupServer";

const initialState = {
  groups: [],
  room: [],
  newMessage: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  isLoad: false,
  message: "",
};

// Create Message
export const createGroupMessage = createAsyncThunk(
  "group/createMessage",
  async (form, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await GroupsServer.createGroupMessage(form, token);
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

// Get user by Id
export const getGroupMessages = createAsyncThunk(
  "group/getGroupMessages",
  async (room_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await GroupsServer.getGroupMessages(room_id, token);
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
      })
      .addCase(getGroupMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGroupMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
      })
      .addCase(getGroupMessages.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGroupMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroupMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newMessage = action.payload;
      })
      .addCase(createGroupMessage.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = groupsSlice.actions;
export default groupsSlice.reducer;
