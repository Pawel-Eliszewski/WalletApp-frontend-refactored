import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  transactionId: null,
};

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setTransactionId(state, action) {
      state.transactionId = action.payload;
    },
  },
});

export const { setIsLoading, setTransactionId } = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
