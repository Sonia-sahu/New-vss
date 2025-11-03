import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const res = await API.get("/skills/");
  return res.data;
});

export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (data) => {
    const res = await API.post("/skills/", data);
    return res.data;
  }
);

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, data }) => {
    const res = await API.put(`/skills/${id}/`, data);
    return res.data;
  }
);

export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id) => {
    await API.delete(`/skills/${id}/`);
    return id;
  }
);

export const fetchSkillAnalytics = createAsyncThunk(
  "skills/fetchSkillAnalytics",
  async (id) => {
    const res = await API.get(`/skills/${id}/analytics/`);
    return res.data;
  }
);
