import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSkills,
  createSkill,
  updateSkill,
  deleteSkill,
  fetchSkillAnalytics,
} from "../actions/skillActions";

const initialState = {
  skills: [],
  analytics: {},
  status: "idle",
  error: null,
};

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.skills = action.payload;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        const index = state.skills.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) state.skills[index] = action.payload;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.skills = state.skills.filter((s) => s.id !== action.payload);
      })
      .addCase(fetchSkillAnalytics.fulfilled, (state, action) => {
        state.analytics[action.meta.arg] = action.payload;
      });
  },
});

export default skillSlice.reducer;
