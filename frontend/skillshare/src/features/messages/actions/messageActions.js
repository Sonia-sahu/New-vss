import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async () => {
    const res = await API.get("/messages/");
    return res.data;
  }
);
