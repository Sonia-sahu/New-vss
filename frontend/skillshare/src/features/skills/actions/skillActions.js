import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";
import { fetchAnalytics } from "../services/skillService";

// Create a new skill
export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await API.post("/skills/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error creating skill:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Fetch all skills from all users (for admin moderation)
export const fetchAllSkills = createAsyncThunk(
  "skills/fetchAllSkills",
  async ({ status }, { rejectWithValue }) => {
    try {
      const url = status ? `/skills/all/?status=${status}` : "/skills/all/";
      const res = await API.get(url);
      console.log("Fetched all skills:", res.data);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all skills"
      );
    }
  }
);

// Fetch skills for a user
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await API.get(`/skills/user/${userId}/`);
      console.log("api skills data:", res.data);
      return Array.isArray(res.data) ? res.data : [res.data];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update an existing skill
export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/skills/skills/${id}/edit/`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//  Delete a skill
export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/skills/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch categories from the backend
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get("/skills/categories/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Fetch analytics for a specific skill
export const fetchSkillAnalytics = createAsyncThunk(
  "skills/fetchSkillAnalytics",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/skills/${id}/analytics/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Get overall analytics
export const getAnalytics = createAsyncThunk(
  "analytics/getAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchAnalytics();
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error");
    }
  }
);

//   Update the status of a skill (admin-only functionality)
export const updateSkillStatus = createAsyncThunk(
  "skills/updateSkillStatus",
  async ({ skillId, status }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/skills/status-update/${skillId}/`, {
        status,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
