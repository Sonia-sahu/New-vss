import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const exploreUsers = createAsyncThunk(
  "community/exploreUsers",
  async () => {
    const res = await API.get("/community/explore/");
    return res.data;
  }
);

export const followUser = createAsyncThunk(
  "community/followUser",
  async (data) => {
    const res = await API.post("/community/follow/", data);
    return res.data;
  }
);

export const unfollowUser = createAsyncThunk(
  "community/unfollowUser",
  async (followingId) => {
    await API.delete(`/community/unfollow/${followingId}/`);
    return followingId;
  }
);
