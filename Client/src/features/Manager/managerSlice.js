import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import managerServer from "./managerServer";

const initialState = {
  company: [],
  users: [],
  isError: false,
  isSuccess: false,
  isSuccessForm: false,
  isLoading: false,
  message: "",
};

// Edit Company
export const editCompany = createAsyncThunk(
  "manager/editCompany",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await managerServer.editCompany(companyData, token);
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

// Active Users
export const activeUsers = createAsyncThunk(
  "manager/activeUsers",
  async (usersData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await managerServer.activeUsers(usersData, token);
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

// Get active Users
export const getActiveUsers = createAsyncThunk(
  "admin/getActiveUsers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await managerServer.getActiveUsers(token);
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

export const managerSlice = createSlice({
  name: "manager",
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
      .addCase(editCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessForm = true;
        state.message = action.payload;
      })
      .addCase(editCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(activeUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccessForm = true;
        state.message = action.payload;
      })
      .addCase(activeUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getActiveUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getActiveUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getActiveUsers.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = managerSlice.actions;
export default managerSlice.reducer;
