import { createSlice } from "@reduxjs/toolkit";
import {
  submitFeedback,
  fetchReceivedFeedback,
} from "../actions/feedbackActions";

const initialState = {
  feedbacks: [],
  status: "idle",
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      .addCase(fetchReceivedFeedback.fulfilled, (state, action) => {
        state.feedbacks = action.payload;
      });
  },
});

export default feedbackSlice.reducer;
