import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  appLanguage: null,
  colorScheme: null,
  isModalOpen: false,
  context: null,
};

const globalSlice = createSlice({
  name: "global",

  initialState,

  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setAppLanguage(state, action) {
      state.appLanguage = action.payload;
    },
    setColorScheme(state, action) {
      state.colorScheme = action.payload;
    },
    setIsModalOpen(state, action) {
      state.isModalOpen = action.payload;
    },
    setContext(state, action) {
      state.context = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setAppLanguage,
  setColorScheme,
  setIsModalOpen,
  setContext,
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
