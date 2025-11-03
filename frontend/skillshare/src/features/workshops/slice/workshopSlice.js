import { createSlice } from "@reduxjs/toolkit";
import {
  fetchWorkshops,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  registerWorkshop,
  fetchMyRegistrations,
} from "../actions/workshopActions";

const initialState = {
  workshops: [],
  myRegistrations: [],
  status: "idle",
  error: null,
};

const workshopSlice = createSlice({
  name: "workshops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkshops.fulfilled, (state, action) => {
        state.workshops = action.payload;
      })
      .addCase(createWorkshop.fulfilled, (state, action) => {
        state.workshops.push(action.payload);
      })
      .addCase(updateWorkshop.fulfilled, (state, action) => {
        const index = state.workshops.findIndex(
          (w) => w.id === action.payload.id
        );
        if (index !== -1) state.workshops[index] = action.payload;
      })
      .addCase(deleteWorkshop.fulfilled, (state, action) => {
        state.workshops = state.workshops.filter(
          (w) => w.id !== action.payload
        );
      })
      .addCase(registerWorkshop.fulfilled, (state, action) => {
        state.myRegistrations.push(action.payload);
      })
      .addCase(fetchMyRegistrations.fulfilled, (state, action) => {
        state.myRegistrations = action.payload;
      });
  },
});

export default workshopSlice.reducer;
