import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  fetchSkillAnalytics,
  updateSkillStatus,
  fetchCategories,
  fetchAllSkills,
  getAnalytics,
} from "../actions/skillActions";

const initialState = {
  skills: [],
  analytics: {},
  status: "idle", // Track the global status of API calls
  error: null,
  data: null,
  createSkillStatus: "idle", // Track the status of the create skill API call
  updateSkillStatus: "idle", // Track the status of the update skill API call
  deleteSkillStatus: "idle", // Track the status of the delete skill API call
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Fetch Skills
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading"; // Set loading state
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set success state
        state.skills = action.payload; // Store fetched skills
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed"; // Set failure state
        state.error = action.error.message; // Store error message
      })

      // Create Skill
      .addCase(createSkill.pending, (state) => {
        state.createSkillStatus = "loading"; // Set loading state for creating skill
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.createSkillStatus = "succeeded"; // Set success state for create
        state.skills.push(action.payload); // Add the new skill
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.createSkillStatus = "failed"; // Set failure state for create
        state.error = action.error.message; // Store error message for create
      })

      // Update Skill
      .addCase(updateSkill.pending, (state) => {
        state.updateSkillStatus = "loading"; // Set loading state for updating skill
      })

      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })

      .addCase(updateSkill.rejected, (state, action) => {
        state.updateSkillStatus = "failed"; // Set failure state for update
        state.error = action.error.message; // Store error message for update
      })

      // Delete Skill
      .addCase(deleteSkill.pending, (state) => {
        state.deleteSkillStatus = "loading"; // Set loading state for deleting skill
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.deleteSkillStatus = "succeeded"; // Set success state for delete
        state.skills = state.skills.filter((s) => s.id !== action.payload); // Remove the skill
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.deleteSkillStatus = "failed"; // Set failure state for delete
        state.error = action.error.message; // Store error message for delete
      })

      // Fetch Skill Analytics
      .addCase(fetchSkillAnalytics.pending, (state) => {
        state.status = "loading"; // Set loading state for fetching analytics
      })
      .addCase(fetchSkillAnalytics.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set success state for analytics fetch
        state.analytics[action.meta.arg] = action.payload; // Store analytics data
      })
      .addCase(fetchSkillAnalytics.rejected, (state, action) => {
        state.status = "failed"; // Set failure state for analytics fetch
        state.error = action.error.message; // Store error message for analytics fetch
      })

      // Update Skill Status
      .addCase(updateSkillStatus.pending, (state) => {
        state.updateSkillStatus = "loading"; // Set loading state for updating skill status
      })
      .addCase(updateSkillStatus.fulfilled, (state, action) => {
        state.updateSkillStatus = "succeeded"; // Set success state for status update
        const index = state.skills.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload; // Update the status of the skill
      })
      .addCase(updateSkillStatus.rejected, (state, action) => {
        state.updateSkillStatus = "failed"; // Set failure state for status update
        state.error = action.error.message; // Store error message for status update
      })

      .addCase(fetchAllSkills.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSkills.fulfilled, (state, action) => {
        console.log(action.payload);
        state.skills = action.payload;
      })
      .addCase(fetchAllSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default skillSlice.reducer;
