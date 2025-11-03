import { createSlice } from "@reduxjs/toolkit";
import {
  exploreUsers,
  followUser,
  unfollowUser,
} from "../actions/communityActions";

const initialState = {
  users: [],
  following: [],
  status: "idle",
  error: null,
};

const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(exploreUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.following.push(action.payload.following);
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.following = state.following.filter(
          (id) => id !== action.meta.arg
        );
      });
  },
});

export default communitySlice.reducer;
