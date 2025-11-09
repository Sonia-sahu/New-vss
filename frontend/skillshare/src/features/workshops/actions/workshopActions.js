import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

//  Fetch all workshops

//async keyword is used to handle asynchronous operations and it always returns a promise
//await keyword is used to wait for a promise to resolve before moving to the next line of code
//createAsyncThunk is a utility from Redux Toolkit that simplifies the process of creating asynchronous actions in Redux
//rejectWithValue is a utility function provided by createAsyncThunk to handle rejected promises and pass custom error messages to the reducers
export const fetchWorkshops = createAsyncThunk(
  "workshops/fetchWorkshops",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/workshops/");
      return res.data;
    } catch (error) {
      console.error("Error fetching workshops:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch workshops."
      );
    }
  }
);

//  Fetch single workshop by ID
export const fetchWorkshopById = createAsyncThunk(
  "workshops/fetchWorkshopById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/workshops/${id}/`);
      return res.data;
    } catch (error) {
      console.error("Error fetching workshop details:", error);
      return rejectWithValue(
        error.response?.data || "Failed to fetch workshop details."
      );
    }
  }
);

//  Create workshop
export const createWorkshop = createAsyncThunk(
  "workshops/createWorkshop",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/workshops/", data);
      return res.data;
    } catch (error) {
      console.error("Error creating workshop:", error);
      return rejectWithValue(
        error.response?.data || "Failed to create workshop."
      );
    }
  }
);

//  Update workshop
export const updateWorkshop = createAsyncThunk(
  "workshops/updateWorkshop",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await API.put(`/workshops/${id}/`, data);
      return res.data;
    } catch (error) {
      console.error("Error updating workshop:", error);
      return rejectWithValue(
        error.response?.data || "Failed to update workshop."
      );
    }
  }
);

//  Delete workshop
export const deleteWorkshop = createAsyncThunk(
  "workshops/deleteWorkshop",
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/workshops/${id}/`);
      return id;
    } catch (error) {
      console.error("Error deleting workshop:", error);
      return rejectWithValue(
        error.response?.data || "Failed to delete workshop."
      );
    }
  }
);

//  Register user for a workshop
export const registerWorkshop = createAsyncThunk(
  "workshops/registerWorkshop",
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post("/workshops/register/", data);
      return res.data; // returns {id, workshop, user, ...}
    } catch (error) {
      console.error("Error registering for workshop:", error);
      return rejectWithValue(
        error.response?.data || "Failed to register for workshop."
      );
    }
  }
);

//  Fetch current user's registrations
export const fetchMyRegistrations = createAsyncThunk(
  "workshops/fetchMyRegistrations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await API.get("/workshops/my-registrations/");

      if (!res.data || res.data.length === 0) {
        console.log("No registrations found.");
      }

      // Return the response data
      return res.data;
    } catch (error) {
      // Improved error logging for debugging
      console.error("Error fetching registrations:", error);

      // If the error has a response object, use it. Otherwise, return a general error message.
      const errorMessage =
        error.response?.data ||
        "An unknown error occurred while fetching registrations.";

      // Optionally, log the full error object for detailed debugging
      console.error("Full error details:", error);

      // Reject with the error message
      return rejectWithValue(errorMessage);
    }
  }
);
export const markWorkshopAttended = (workshopId) => async () => {
  await API.patch(`/workshops/${workshopId}/attend/`);
};
