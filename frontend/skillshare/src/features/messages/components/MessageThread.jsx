import { Box, Typography } from "@mui/material";

export default function MessageThread({ messages }) {
  return (
    <Box sx={{ p: 2 }}>
      {messages.map((msg) => (
        <Box key={msg.id} sx={{ mb: 2 }}>
          <Typography variant="subtitle2">
            {msg.sender.username} → {msg.receiver.username}
          </Typography>
          <Typography variant="body1">{msg.content}</Typography>
          <Typography variant="caption">{msg.timestamp}</Typography>
        </Box>
      ))}
    </Box>
  );
}
