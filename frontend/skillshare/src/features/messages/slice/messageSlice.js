import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../actions/messageActions";

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    markAsRead(state, action) {
      const msg = state.messages.find((m) => m.id === action.payload);
      if (msg) msg.is_read = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      state.messages = action.payload;
    });
  },
});

export const { addMessage, markAsRead } = messageSlice.actions;
export default messageSlice.reducer;
