import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (data) => {
    const res = await API.post("/feedback/submit/", data);
    return res.data;
  }
);

export const fetchReceivedFeedback = createAsyncThunk(
  "feedback/fetchReceivedFeedback",
  async () => {
    const res = await API.get("/feedback/received/");
    return res.data;
  }
);
