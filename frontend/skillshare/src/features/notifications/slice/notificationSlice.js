import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  markNotificationRead,
} from "../actions/notificationActions";

const initialState = {
  notifications: [],
  status: "idle",
  error: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload;
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const index = state.notifications.findIndex(
          (n) => n.id === action.meta.arg
        );
        if (index !== -1) state.notifications[index].is_read = true;
      });
  },
});

export default notificationSlice.reducer;
