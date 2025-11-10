import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConversations } from "../features/messages/actions/chatActions";
import MessageList from "../features/messages/components/MessageList";
import { Box, CircularProgress, Typography, Paper } from "@mui/material";

const MessagePage = () => {
  const dispatch = useDispatch();
  const { conversations, loading, error } = useSelector(
    (state) => state.messages
  );

  useEffect(() => {
    dispatch(getConversations());
  }, [dispatch]);

  return (
    <Box sx={{ px: 2, py: 4, maxWidth: "900px", mx: "auto" }}>
      {/* <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
        Your Conversations
      </Typography> */}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" mt={4}>
          {error}
        </Typography>
      )}

      {!loading && !error && (
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: "#1f3b73" }}>
          <MessageList conversations={conversations} />
        </Paper>
      )}
    </Box>
  );
};

export default MessagePage;
