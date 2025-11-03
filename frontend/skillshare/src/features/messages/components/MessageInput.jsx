import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function MessageInput({ onSend }) {
  const [content, setContent] = useState("");

  const handleSend = () => {
    if (content.trim()) {
      onSend(content);
      setContent("");
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <TextField
        fullWidth
        label="Type a message"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="contained" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
}
