import React, { useState } from "react";
import { Button, TextField, Box, Paper } from "@mui/material";
import { useDispatch } from "react-redux";
import { sendMessage } from "../actions/chatActions";

const MessageInput = ({ chatId }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (message.trim()) {
      dispatch(sendMessage({ chatId, content: message }));
      setMessage("");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        alignItems: "center",
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <TextField
        fullWidth
        label="Type your message"
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        sx={{
          bgcolor: "background.paper", // ✅ matches theme
          "& .MuiInputBase-input": {
            color: "text.primary", // ✅ sets actual input text color
          },
          "& .MuiInputLabel-root": {
            color: "text.secondary", // ✅ label color
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "primary.main", // ✅ optional border color
          },
        }}
      />

      <Button
        variant="contained"
        onClick={handleSendMessage}
        sx={{ minWidth: 100, backgroundColor: "green" }}
      >
        Send
      </Button>
    </Paper>
  );
};

export default MessageInput;
