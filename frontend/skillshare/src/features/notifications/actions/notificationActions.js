import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const res = await API.get("/notifications/");
    return res.data;
  }
);

export const markNotificationRead = createAsyncThunk(
  "notifications/markNotificationRead",
  async (id) => {
    await API.patch(`/notifications/${id}/read/`);
    return id;
  }
);
