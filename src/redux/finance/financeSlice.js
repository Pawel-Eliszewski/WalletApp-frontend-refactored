import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./operations";
import { register, login, logout, refreshUser } from "../session/operations";

const initialState = {
  totalBalance: 0,
  data: [],
  transactionId: null,
  error: null,
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  console.error(state.error);
};

const financeSlice = createSlice({
  name: "finance",

  initialState,

  reducers: {
    setTransactionId(state, action) {
      state.transactionId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.error = null;
        state.data = action.payload.data;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.error = null;
        state.data.push(action.payload.data);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.data.splice(index, 1);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.error = null;
        const index = state.data.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.data.splice(index, 1, action.payload.data);
        state.totalBalance = action.payload.userBalance;
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(register.fulfilled, (state, action) => {
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.totalBalance = action.payload.data.balance;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload.tokenExpired) {
          state.totalBalance = 0;
          state.data = [];
          state.error = null;
        } else {
          state.totalBalance = action.payload.data.balance;
          state.error = null;
        }
      })
      .addCase(logout.fulfilled, (state) => {
        state.totalBalance = 0;
        state.data = [];
        state.error = null;
      });
  },
});

export const { setTransactionId } = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
