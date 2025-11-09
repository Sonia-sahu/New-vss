import { createSlice } from "@reduxjs/toolkit";
import {
  fetchNotifications,
  markNotificationRead,
  fetchUnreadCount,
} from "../actions/notificationActions";

const initialState = {
  items: [],
  loading: false,
  error: null,
  unreadCount: 0,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    markAllRead(state) {
      state.items = state.items.map((n) => ({ ...n, is_read: true }));
    },
    addNotification(state, action) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        console.log("  Notifications loaded:", action.payload);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error(
          "❌ Failed to fetch notifications:",
          action.error.message
        );
      })
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.items.find((n) => n.id === id);
        if (notif) notif.is_read = true;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      });
  },
});

export const { markAllRead, addNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
