import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWorkshops,
  fetchWorkshopById,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  registerWorkshop,
  fetchMyRegistrations,
} from "../actions/workshopActions";

const initialState = {
  workshops: [],
  currentWorkshop: null,
  myRegistrations: [],
  status: "idle",
  registerStatus: "idle",
  error: null,
};

const workshopSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {
    clearCurrentWorkshop: (state) => {
      state.currentWorkshop = null;
    },
    resetRegisterStatus: (state) => {
      state.registerStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.workshops = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchWorkshopById.fulfilled, (state, action) => {
        state.currentWorkshop = action.payload;
        state.status = "succeeded";
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.workshops.push(action.payload);
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        const index = state.workshops.findIndex(
          (w) => w.id === action.payload.id
        );
        if (index !== -1) state.workshops[index] = action.payload;
        if (
          state.currentWorkshop &&
          state.currentWorkshop.id === action.payload.id
        ) {
          state.currentWorkshop = action.payload;
        }
      })
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.workshops = state.workshops.filter(
          (w) => w.id !== action.payload
        );
        if (
          state.currentWorkshop &&
          state.currentWorkshop.id === action.payload
        ) {
          state.currentWorkshop = null;
        }
      })
      .addCase(registerWorkshop.fulfilled, (state, action) => {
        const newRegistration = action.payload;
        const exists = state.myRegistrations.some(
          (reg) =>
            Number(reg.workshop) === Number(newRegistration.workshop) &&
            Number(reg.user) === Number(newRegistration.user)
        );
        if (!exists) {
          state.myRegistrations.push(newRegistration);
        }
        state.registerStatus = "succeeded";
      })
      .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
        state.myRegistrations = action.payload;
      });
  },
});

export const { clearCurrentWorkshop, resetRegisterStatus } =
  workshopSlice.actions;

export const selectMyRegistrations = (state) => state.workshops.myRegistrations;

export default workshopSlice.reducer;
