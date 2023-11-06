import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Notify from "../../utils/notifications";

export const instance = axios.create({
  baseURL: "https://finance-app-wallet-backend.cyclic.app",
});

const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "session/register",
  async (credentials, thunkAPI) => {
    try {
      const response = await instance.post("/user/register", credentials);
      Notify.info("Registration successful");
      return response.data;
    } catch (error) {
      error.response.data.message === "Email in use"
        ? Notify.failure("Email is already in use")
        : Notify.failure("Registration failed");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "session/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await instance.post("/user/login", credentials);
      setAuthHeader(response.data.data.token);
      Notify.info(`Welcome back, ${response.data.data.firstname}`);
      return response.data;
    } catch (error) {
      Notify.failure("Invalid email or password");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, thunkAPI) => {
    try {
      await instance.get("/user/logout");
      Notify.info("Logged out successfully");
      clearAuthHeader();
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "session/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.session.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthHeader(persistedToken);
      const response = await instance.get("/user/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
