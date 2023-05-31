import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PeopleServer from "./PeopleServer";

const initialState = {
  people: [],
  room: [],
  newMessage: [],
  adminPeople: [],
  adminUsers: [],
  employeeManagerUsrs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Message
export const createMessage = createAsyncThunk(
  "people/createMessage",
  async (form, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.createMessage(form, token);
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
export const getRoom = createAsyncThunk(
  "people/getRoom",
  async (room_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.getRoom(room_id, token);
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

// Employee Manager Users
export const getEmployeeManagerUsers = createAsyncThunk(
  "people/getEmployeeManagerUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.getEmployeeManagerUsers(token);
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

// Admin Users
export const getAdminUsers = createAsyncThunk(
  "people/getAdminUSers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.getAdminUsers(token);
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

// Search People
export const getPeople = createAsyncThunk(
  "people/getPeople",
  async ({ search }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.getPeople(search, token);
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

// Admin Search People
export const getAdminPeople = createAsyncThunk(
  "people/getAdminPeople",
  async ({ search }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await PeopleServer.getAdminPeople(search, token);
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

export const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.people = action.payload;
      })
      .addCase(getPeople.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdminPeople.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminPeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminPeople = action.payload;
      })
      .addCase(getAdminPeople.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAdminUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdminUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminUsers = action.payload;
      })
      .addCase(getAdminUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEmployeeManagerUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEmployeeManagerUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.employeeManagerUsrs = action.payload;
      })
      .addCase(getEmployeeManagerUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.room = action.payload;
      })
      .addCase(getRoom.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.newMessage = action.payload;
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = peopleSlice.actions;
export default peopleSlice.reducer;
