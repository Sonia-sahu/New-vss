import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchModerationLogs = createAsyncThunk(
  "admin/fetchModerationLogs",
  async () => {
    const res = await API.get("/adminpanel/logs/");
    return res.data;
  }
);

export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async () => {
    const res = await API.get("/adminpanel/users/");
    return res.data;
  }
);

export const moderateSkill = createAsyncThunk(
  "admin/moderateSkill",
  async ({ id, data }) => {
    const res = await API.patch(`/adminpanel/skills/${id}/moderate/`, data);
    return res.data;
  }
);
