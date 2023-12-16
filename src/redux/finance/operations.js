import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, clearAuthHeader } from "../session/operations";
import { Notify, Report } from "../../utils/notiflixStyles";
import {
  addTransactionMessage,
  updateTransactionMessage,
  deleteTransactionMessage,
  tryAgainMessage,
  logInAgainMessage,
  sessionExpiredMessage,
  loggingMessage,
} from "../../utils/notiflixMessages";
import { Loading } from "notiflix";

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (userId, thunkAPI) => {
    try {
      const response = await instance.get(`/user/${userId}/transactions`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (data, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.hourglass();
      const response = await instance.post("/transaction", data);
      Loading.remove();
      Notify.success(addTransactionMessage(appLanguage));
      return response.data;
    } catch (error) {
      Loading.remove();
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          logInAgainMessage(appLanguage),
          sessionExpiredMessage(appLanguage),
          loggingMessage(appLanguage),
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Loading.remove();
        Notify.failure(tryAgainMessage(appLanguage));
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (transactionID, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.hourglass();
      const response = await instance.delete(`/transaction/${transactionID}`);
      Loading.remove();
      Notify.success(deleteTransactionMessage(appLanguage));
      return response.data;
    } catch (error) {
      Loading.remove();
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          logInAgainMessage(appLanguage),
          sessionExpiredMessage(appLanguage),
          loggingMessage(appLanguage),
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Loading.remove();
        Notify.failure(tryAgainMessage(appLanguage));
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "finance/updateTransaction",
  async (data, thunkAPI) => {
    const { appLanguage } = thunkAPI.getState().global;
    try {
      Loading.hourglass();
      const response = await instance.patch(
        `/transaction/${data.transactionId}`,
        data
      );
      Loading.remove();
      Notify.success(updateTransactionMessage(appLanguage));
      return response.data;
    } catch (error) {
      Loading.remove();
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          logInAgainMessage(appLanguage),
          sessionExpiredMessage(appLanguage),
          loggingMessage(appLanguage),
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Loading.remove();
        Notify.failure(tryAgainMessage(appLanguage));
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
