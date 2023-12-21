import { createSlice } from "@reduxjs/toolkit";
import {
  fetchTransactions,
  addTransaction,
  deleteTransaction,
  updateTransaction,
} from "./operations";
import { register, login, logout, refreshUser } from "../session/operations";

const initialState = {
  transactions: null,
  transactionsFilters: null,
  filteredTransactions: null,
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
    setTransactionsFilters(state, action) {
      state.transactionsFilters = action.payload;
    },
    setFilteredTransactions(state, action) {
      state.filteredTransactions = action.payload;
    },
    setTransactionId(state, action) {
      state.transactionId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.data;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, handleRejected)
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload.data);
        state.error = null;
      })
      .addCase(addTransaction.rejected, handleRejected)
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.transactions.splice(index, 1);
        state.error = null;
      })
      .addCase(deleteTransaction.rejected, handleRejected)
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(
          (transaction) => transaction._id === action.payload.data._id
        );
        state.transactions.splice(index, 1, action.payload.data);
        state.error = null;
      })
      .addCase(updateTransaction.rejected, handleRejected)
      .addCase(register.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload.tokenExpired) {
          state.error = null;
        } else {
          state.error = null;
        }
      })
      .addCase(logout.fulfilled, () => initialState)
      .addCase(logout.rejected, () => initialState);
  },
});

export const {
  setTransactionsFilters,
  setFilteredTransactions,
  setTransactionId,
} = financeSlice.actions;
export const financeReducer = financeSlice.reducer;
