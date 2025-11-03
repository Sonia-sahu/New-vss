import { createSlice } from "@reduxjs/toolkit";
import {
  fetchModerationLogs,
  moderateSkill,
  fetchAllUsers,
} from "../actions/adminActions";

const initialState = {
  logs: [],
  users: [],
  status: "idle",
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModerationLogs.fulfilled, (state, action) => {
        state.logs = action.payload;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(moderateSkill.fulfilled, (state, action) => {
        // Optionally update logs or skills here
      });
  },
});

export default adminSlice.reducer;
