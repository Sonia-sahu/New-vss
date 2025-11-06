import { createSlice } from "@reduxjs/toolkit";
import {
  fetchModerationLogs,
  fetchAllUsers,
  moderateSkill,
  deleteUser,
  editUser,
  deleteSkill,
} from "../actions/adminActions";

const initialState = {
  logs: [],
  users: [],
  status: "idle",
  error: null,
  skills: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Moderation Logs
      .addCase(fetchModerationLogs.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchModerationLogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.logs = action.payload;
      })
      .addCase(fetchModerationLogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch All Users
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })

      // Edit User
      .addCase(editUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      .addCase(moderateSkill.pending, (state) => {
        state.moderationStatus = "loading";
      })
      .addCase(moderateSkill.fulfilled, (state, action) => {
        state.moderationStatus = "succeeded";
        state.moderationError = null;
      })
      .addCase(moderateSkill.rejected, (state, action) => {
        state.moderationStatus = "failed";
        state.moderationError = action.payload;
      })

      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.deletedSkills.push(action.payload);
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.moderationError = action.payload;
      });
  },
});

export default adminSlice.reducer;
