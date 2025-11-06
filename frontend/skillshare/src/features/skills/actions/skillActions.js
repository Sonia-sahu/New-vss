import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

// Fetch skills for a user
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (userId) => {
    const res = await API.get(`/skills/user/${userId}/`);
    console.log("api skills data:", res.data); // Log the response to verify

    // If the response is a single object, convert it into an array
    return Array.isArray(res.data) ? res.data : [res.data];
  }
);

// Create a new skill with default status of 'in review'
// Create a new skill with the provided FormData (including certification)
export const createSkill = createAsyncThunk(
  "skills/createSkill",
  async (formData, { rejectWithValue }) => {
    try {
      // Make the API POST request with FormData
      const res = await API.post("/skills/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct header for file uploads
        },
      });

      return res.data; // Return the data to be used in the reducer
    } catch (error) {
      console.error("Error creating skill:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
// Update an existing skill

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, data }) => {
    const res = await API.put(`/skills/skills/${id}/edit/`, data);
    return res.data;
  }
);

// Delete a skill
export const deleteSkill = createAsyncThunk(
  "skills/deleteSkill",
  async (id) => {
    await API.delete(`/skills/${id}/`);
    return id;
  }
);
// Fetch categories from the backend
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await API.get("/skills/categories/"); // Assume this is the endpoint for categories
    return response.data;
  }
);
// Fetch analytics for a specific skill
export const fetchSkillAnalytics = createAsyncThunk(
  "skills/fetchSkillAnalytics",
  async (id) => {
    const res = await API.get(`/skills/${id}/analytics/`);
    return res.data;
  }
);

// Update the status of a skill (admin-only functionality)
export const updateSkillStatus = createAsyncThunk(
  "skills/updateSkillStatus",
  async ({ skillId, status }) => {
    const res = await API.patch(`/skills/status-update/${skillId}/`, {
      status,
    });
    return res.data;
  }
);

// Fetch all skills from all users (for admin moderation)
export const fetchAllSkills = createAsyncThunk(
  "skills/fetchAllSkills",
  async ({ status }, { rejectWithValue }) => {
    try {
      const url = status ? `/skills/all/?status=${status}` : "/skills/all/";
      const res = await API.get(url);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch all skills"
      );
    }
  }
);
