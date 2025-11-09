import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

//  Fetch all notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return []; // skip when logged out

    try {
      console.log(" Fetching notifications from backend...");
      const res = await API.get("/notifications/");
      console.log(" Notifications fetched:", res.data);
      return res.data;
    } catch (err) {
      console.error(
        " Error fetching notifications:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Mark a notification as read
export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return rejectWithValue("Not logged in");

    try {
      console.log(" Marking notification as read:", id);
      await API.patch(`/notifications/mark-read/${id}/`);
      return id;
    } catch (err) {
      console.error(
        " Error marking notification as read:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

//  Fetch unread count
export const fetchUnreadCount = createAsyncThunk(
  "notifications/fetchUnreadCount",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    if (!token) return 0;

    try {
      const res = await API.get("/notifications/unread-count/");
      return res.data.unread_count;
    } catch (err) {
      console.error(
        " Error fetching unread count:",
        err.response?.data || err.message
      );
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
