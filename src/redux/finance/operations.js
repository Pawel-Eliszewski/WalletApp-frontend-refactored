import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance, clearAuthHeader } from "../session/operations";
import { Notify, Report } from "../../utils/notiflixStyles";

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
    try {
      const response = await instance.post("/transaction", data);
      Notify.success("Transaction added");
      return response.data;
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          "Failure, please log in again",
          "Your session has expired, or you have logged in on another device.",
          "Log in",
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Notify.failure("Failure, please try again");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (transactionID, thunkAPI) => {
    try {
      const response = await instance.delete(`/transaction/${transactionID}`);
      Notify.success("Transaction deleted");
      return response.data;
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          "Failure, please log in again",
          "Your session has expired, or you have logged in on another device.",
          "Log in",
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Notify.failure("Failure, please try again");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "finance/updateTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await instance.patch(
        `/transaction/${data.transactionId}`,
        data
      );
      Notify.success("Transaction updated");
      return response.data;
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        Report.failure(
          "Failure, please log in again",
          "Your session has expired, or you have logged in on another device.",
          "Log in",
          () => {
            window.location.reload();
          }
        );
        clearAuthHeader();
      } else {
        Notify.failure("Failure, please try again");
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
