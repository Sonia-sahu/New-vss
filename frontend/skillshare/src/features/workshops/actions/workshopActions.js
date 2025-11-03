import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

export const fetchWorkshops = createAsyncThunk(
  "workshops/fetchWorkshops",
  async () => {
    const res = await API.get("/workshops/");
    return res.data;
  }
);

export const createWorkshop = createAsyncThunk(
  "workshops/createWorkshop",
  async (data) => {
    const res = await API.post("/workshops/", data);
    return res.data;
  }
);

export const updateWorkshop = createAsyncThunk(
  "workshops/updateWorkshop",
  async ({ id, data }) => {
    const res = await API.put(`/workshops/${id}/`, data);
    return res.data;
  }
);

export const deleteWorkshop = createAsyncThunk(
  "workshops/deleteWorkshop",
  async (id) => {
    await API.delete(`/workshops/${id}/`);
    return id;
  }
);

export const registerWorkshop = createAsyncThunk(
  "workshops/registerWorkshop",
  async (data) => {
    const res = await API.post("/workshops/register/", data);
    return res.data;
  }
);

export const fetchMyRegistrations = createAsyncThunk(
  "workshops/fetchMyRegistrations",
  async () => {
    const res = await API.get("/workshops/my-registrations/");
    return res.data;
  }
);
