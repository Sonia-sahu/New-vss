import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

//  Submit feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/feedback/submit/", data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

//  Fetch received feedback
export const fetchReceivedFeedback = createAsyncThunk(
  "feedback/fetchReceivedFeedback",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/feedback/received/");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
