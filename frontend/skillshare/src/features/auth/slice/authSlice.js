import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  fetchProfile,
  followUser,
  sendResetLink,
  resetPassword,
} from "../actions/authActions";
import { removeToken, setToken } from "../../../utils/tokenUtils";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
  success: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.success = false;
      state.isLoggedIn = false;
      removeToken();
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Register user ---
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // --- Login user ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access;
        state.isLoggedIn = true;
        setToken(action.payload.access); //   save token via utility
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid credentials";
      })

      // --- Fetch profile ---
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      //   Follow user
      .addCase(followUser.fulfilled, (state, action) => {
        state.user.following = action.payload.following;
        state.user.followers = action.payload.followers;
      })

      .addCase(sendResetLink.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(sendResetLink.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(sendResetLink.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
