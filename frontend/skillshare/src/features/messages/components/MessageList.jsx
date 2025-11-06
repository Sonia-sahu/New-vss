import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  TextField,
  Paper,
  Divider,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import messagingService from "../services/chatService";
import MessageIcon from "@mui/icons-material/Message";

const MessageList = ({ conversations, loading, error }) => {
  const [username, setUsername] = useState("");
  const [starting, setStarting] = useState(false);
  const navigate = useNavigate();

  const handleStartChat = async () => {
    if (!username.trim()) return alert("Please enter a username");
    try {
      setStarting(true);
      const response = await messagingService.startPrivateChat(username);
      navigate(`/chat-room/${response.chat_id}`, { state: { username } });
    } catch (err) {
      console.error("Error starting chat:", err);
      alert("Failed to start chat. User not found or already in chat.");
    } finally {
      setStarting(false);
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "60vh" }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: "700px", mx: "auto", p: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Your Conversations
      </Typography>

      {conversations.length > 0 ? (
        conversations.map((convo) => (
          <Box key={convo.id} sx={{ mb: 2 }}>
            <Link
              to={`/chat-room/${convo.id}`}
              state={{ username: convo.user.username }}
              style={{ textDecoration: "none" }}
            >
              <Button
                fullWidth
                sx={{ border: "1px solid #fff" }}
                variant="custom"
                startIcon={<MessageIcon />}
              >
                Talk to {convo.user.username}
              </Button>
            </Link>
          </Box>
        ))
      ) : (
        <Typography textAlign="center" color="text.secondary">
          You haven’t started any chats yet.
        </Typography>
      )}

      <Divider sx={{ my: 4 }} />

      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Start a New Conversation
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Enter a username to begin a private chat. You can connect with anyone
          in the community.
        </Typography>
        <TextField
          fullWidth
          placeholder="e.g. johndoe"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          fullWidth
          sx={{ mt: 2, border: "1px solid #ffff" }}
          variant="custom"
          onClick={handleStartChat}
          disabled={starting}
        >
          {starting ? "Connecting..." : "Start Conversation"}
        </Button>
      </Paper>
    </Box>
  );
};

export default MessageList;
