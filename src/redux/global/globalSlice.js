import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //   isLoading: false,
  isModalOpen: false,
  context: null,
};

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {
    // setIsLoading(state, action) {
    //   state.isLoading = action.payload;
    // },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setContext(state, action) {
      state.context = action.payload;
    },
    // setTransactionId(state, action) {
    //   state.transactionId = action.payload;
    // },
  },
});

export const {
  //   setIsLoading,
  setIsModalOpen,
  setContext,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
