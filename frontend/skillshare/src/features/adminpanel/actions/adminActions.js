import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

// Already present
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await API.get("/adminpanel/users/");
    return res.data;
  }
);

// ✅ Delete a user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/adminpanel/users/${id}/`);
      return id; // Return ID to remove from state
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Edit a user
export const editUser = createAsyncThunk(
  "admin/editUser",
  async ({ id, ...data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/adminpanel/users/${id}/`, data);
      return res.data; // Updated user object
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

//✅ Fetch moderation logs
export const fetchModerationLogs = createAsyncThunk(
  "admin/fetchModerationLogs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/adminpanel/logs/");
      console.log("Fetched moderation logs:", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const moderateSkill = createAsyncThunk(
  "admin/moderateSkill",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`adminpanel/skills/${id}/moderate/`, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Moderation failed");
    }
  }
);

// Delete a skill
export const deleteSkill = createAsyncThunk(
  "admin/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/skills/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);
