import { useDispatch } from "react-redux";
import { addMessage } from "../slice/messageSlice";
import { useWebSocket } from "../../../hooks/useWebSocket";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { Box, Typography } from "@mui/material";

export default function ChatRoom({ roomName }) {
  const dispatch = useDispatch();

  const socket = useWebSocket(roomName, (msg) => {
    dispatch(addMessage(JSON.parse(msg)));
  });

  const handleSend = (content) => {
    const message = { content, timestamp: new Date().toISOString() };
    socket.send(JSON.stringify(message));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5">Chat Room: {roomName}</Typography>
      <MessageList />
      <MessageInput onSend={handleSend} />
    </Box>
  );
}
