import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Loading } from "notiflix";
import { Notify, Report } from "../../utils/notiflixStyles";
import {
  loggingSuccessfulMessage,
  welcomeMessage,
  demoWelcomeMessage,
  demoWelcomeInfoMessage,
  invalidCredentialsMessage,
  loggingFailedMessage,
  registeredMessage,
  emailInUseMessage,
  registrationFailedMessage,
  loggingOutMessage,
  loggedOutMessage,
  networkErrorMessage,
} from "../../utils/notiflixMessages";

export const instance = axios.create({
  baseURL: "https://finance-app-wallet-backend.cyclic.app",
});

const setAuthHeader = (token) => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  instance.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "session/register",
  async (credentials, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.circle();
      const response = await instance.post("/user/register", credentials);
      Loading.remove();
      Notify.info(registeredMessage(appLanguage));
      return response.data;
    } catch (error) {
      Loading.remove();
      if (error.response.data.message === "Email in use") {
        Notify.failure(emailInUseMessage(appLanguage));
      } else if (error.message === "Network Error") {
        Notify.failure(networkErrorMessage(appLanguage));
      } else Notify.failure(registrationFailedMessage(appLanguage));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "session/login",
  async (credentials, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.circle();
      const response = await instance.post("/user/login", credentials);
      Loading.remove();
      setAuthHeader(response.data.data.token);
      setTimeout(() => {
        if (response.data.data.ID !== "650f2fb1143d76a0d93a0176") {
          Notify.info(
            `${loggingSuccessfulMessage(appLanguage)}<br>
           ${welcomeMessage(appLanguage, response.data.data.firstname)}`
          );
        } else {
          Report.info(
            demoWelcomeMessage(appLanguage),
            demoWelcomeInfoMessage(appLanguage),
            "OK"
          );
        }
      }, 1500);
      return response.data;
    } catch (error) {
      Loading.remove();
      if (
        error.message ===
        "Cannot read properties of undefined (reading 'token')"
      ) {
        Notify.failure(invalidCredentialsMessage(appLanguage));
      } else if (error.message === "Network Error") {
        Notify.failure(networkErrorMessage(appLanguage));
      } else Notify.failure(loggingFailedMessage(appLanguage));
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.circle();
      await instance.get("/user/logout");
      Loading.remove();
      clearAuthHeader();
      Notify.info(loggingOutMessage(appLanguage));
    } catch (error) {
      Loading.remove();
      clearAuthHeader();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "session/refresh",
  async (_, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    const state = thunkAPI.getState();
    const persistedToken = state.session.token;
    try {
      Loading.circle();
      setAuthHeader(persistedToken);
      const response = await instance.get("/user/current");
      Loading.remove();
      return response.data;
    } catch (error) {
      Loading.remove();
      if (persistedToken) {
        Notify.info(loggedOutMessage(appLanguage));
      }
      if (error.response && error.response.status === 401) {
        return { tokenExpired: true };
      } else {
        Loading.remove();
        if (error.message === "Network Error") {
          Notify.failure(networkErrorMessage(appLanguage));
        }
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);
