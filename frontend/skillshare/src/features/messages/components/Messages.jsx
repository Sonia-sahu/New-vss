import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersToChat } from "../features/chat/chatSlice";
import {
  Button,
  CircularProgress,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Divider,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";

const Messages = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchUsersToChat());
  }, [dispatch]);

  const userList = Array.isArray(users?.results)
    ? users.results
    : Array.isArray(users)
    ? users
    : [];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" textAlign="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: "900px", mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Start a Conversation
      </Typography>

      {userList.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 3,
          }}
        >
          {userList.map((user) => (
            <Paper
              key={user.id}
              elevation={3}
              sx={{
                p: 2,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar src={user.profile_image || ""}>
                  {user.username?.[0]?.toUpperCase() || "U"}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {user.username}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tap to start a private chat
                  </Typography>
                </Box>
              </Box>
              {console.log(user.username)}
              <Link
                to={`/chat-room/${user.id}`}
                state={{ username: user.username }}
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" color="primary">
                  Chat
                </Button>
              </Link>
            </Paper>
          ))}
        </Box>
      ) : (
        <Typography textAlign="center" mt={4} color="text.secondary">
          No users available to chat with right now.
        </Typography>
      )}
    </Box>
  );
};

export default Messages;
