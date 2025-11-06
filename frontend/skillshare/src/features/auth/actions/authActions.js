import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { removeToken, setToken } from "../../../utils/tokenUtils";

// --- Register New User ---
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

// --- Login User ---
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      setToken(data.access);

      // Fetch user profile after login
      const profile = await authService.getProfile();

      return {
        access: data.access,
        refresh: data.refresh,
        user: profile, // ✅ include user object
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// --- Fetch Logged-in User Profile ---
export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      return await authService.getProfile();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch profile"
      );
    }
  }
);

// --- Update User Profile ---
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedData, thunkAPI) => {
    try {
      return await authService.updateProfile(updatedData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update profile"
      );
    }
  }
);

// --- Refresh Token (JWT) ---
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      const data = await authService.refreshToken();
      setToken(data.access); // update token
      return data;
    } catch (error) {
      removeToken();
      return thunkAPI.rejectWithValue("Session expired. Please log in again.");
    }
  }
);

// --- Change Password ---
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      return await authService.changePassword(passwordData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Password change failed"
      );
    }
  }
);

// --- Logout User ---
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
      removeToken();
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue("Logout failed");
    }
  }
);

// --- Fetch User Settings ---
export const fetchSettings = createAsyncThunk(
  "auth/fetchSettings",
  async (_, thunkAPI) => {
    try {
      const data = await authService.getSettings();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch user settings"
      );
    }
  }
);

// --- ✅ Update User Settings ---
export const updateSettings = createAsyncThunk(
  "auth/updateSettings",
  async (settingsData, thunkAPI) => {
    try {
      const data = await authService.updateSettings(settingsData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to update settings"
      );
    }
  }
);
