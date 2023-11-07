import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, refreshUser } from "./operations";

const initialState = {
  isAuth: false,
  isLoading: false,
  isRefreshing: false,
  error: null,
  token: null,
  user: null,
};

const handleRejected = (state, action) => {
  state.error = action.payload;
  state.isAuth = false;
  state.isLoading = false;
  state.isRefreshing = false;
  state.user = null;
  console.error(state.error);
};

const sessionSlice = createSlice({
  name: "session",

  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data._id,
          email: action.payload.data.email,
          firstname: action.payload.data.firstname,
        };
        state.isLoading = false;
        state.error = null;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          id: action.payload.data.ID,
          email: action.payload.data.email,
          firstname: action.payload.data.firstname,
        };
        state.token = action.payload.data.token;
        state.isAuth = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, handleRejected)
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuth = false;
        state.isLoading = false;
        state.error = null;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.rejected, handleRejected)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        if (action.payload.tokenExpired) {
          state.isRefreshing = false;
          state.isAuth = false;
          state.token = null;
          state.error = null;
        } else {
          state.isRefreshing = false;
          state.isAuth = true;
          state.token = action.payload.data.token;
          state.user = {
            id: action.payload.data._id,
            email: action.payload.data.email,
            firstname: action.payload.data.firstname,
          };
        }
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.isAuth = false;
        state.token = null;
        state.error = null;
      });
  },
});

export const sessionReducer = sessionSlice.reducer;
