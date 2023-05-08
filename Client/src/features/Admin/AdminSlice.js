import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AdminServer from "./AdminServer";

const initialState = {
  companies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Account
export const createAccount = createAsyncThunk(
  "admin/createAccount",
  async (accountData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await AdminServer.createAccount(accountData, token);
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

// Create Company
export const createCompany = createAsyncThunk(
  "admin/createCompany",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await AdminServer.createCompany(companyData, token);
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

// Get Companies
export const getCompanies = createAsyncThunk(
  "admin/getCompanies",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await AdminServer.getCompanies(token);
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

// Active Company
export const activeCompany = createAsyncThunk(
  "admin/activeCompany",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await AdminServer.activeCompany(companyData, token);
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

export const adminSlice = createSlice({
  name: "admin",
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
      .addCase(createAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(createCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCompanies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(activeCompany.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(activeCompany.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(activeCompany.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = adminSlice.actions;
export default adminSlice.reducer;
