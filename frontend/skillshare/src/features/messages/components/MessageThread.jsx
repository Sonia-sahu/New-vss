import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../actions/chatActions";
import { Box, Typography, CircularProgress } from "@mui/material";
import MessageInput from "./MessageInput";
const MessageThread = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const {
    messages = [],
    loading,
    error,
  } = useSelector((state) => state.messages);
  useEffect(() => {
    if (chatId) {
      dispatch(getMessages(chatId));
    }
  }, [dispatch, chatId]);
  const currentUserId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  if (loading)
    return (
      <CircularProgress sx={{ display: "block", margin: "0 auto", mt: 4 }} />
    );
  if (error)
    return (
      <Typography color="error" sx={{ textAlign: "center", mt: 4 }}>
        {typeof error === "string"
          ? error
          : error.message || error.error || JSON.stringify(error)}
      </Typography>
    );
  return (
    <Box
      sx={{
        p: { xs: 1, sm: 2 },
        bgcolor: "background.default",
        borderRadius: { xs: 0, sm: 3 },
        boxShadow: { xs: 0, sm: 2 },
        width: "100%",
        maxWidth: {
          xs: "100%", // full width on extra-small screens
          sm: "95%", // slightly narrower on small screens
          md: "900px", // wider on medium screens
          lg: "1000px", // even wider on large screens
        },
        mx: "auto",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
        Chat Title
      </Typography>
      {/* Chat Messages */}{" "}
      <Box
        sx={{
          border: "1px solid rgba(255,255,255,0.1)", // subtle border
          borderRadius: 2,
          p: 2,
          mb: 2,
          height: "60vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
          bgcolor: "background.paper", // dark paper background
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg) => {
            const isSender = msg.sender?.id === currentUserId;

            return (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: isSender ? "flex-end" : "flex-start",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    bgcolor: isSender ? "primary.main" : "grey.800",
                    color: isSender ? "#fff" : "text.primary",
                    px: 2,
                    py: 1.5,
                    borderRadius: isSender
                      ? "16px 0 16px 16px"
                      : "0 16px 16px 16px",
                    maxWidth: "70%",
                    boxShadow: 1,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {msg.sender?.username || "Unknown"}:
                  </Typography>
                  <Typography variant="body1">{msg.content || ""}</Typography>
                </Box>
              </Box>
            );
          })
        ) : (
          <Typography
            sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
          >
            No messages yet. Start the conversation below 👇
          </Typography>
        )}
        <Box ref={messagesEndRef} />
      </Box>
      {/* Message Input */}{" "}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          pt: 2,
          bgcolor: "background.paper", // consistent input background
          boxShadow: "0 -2px 8px rgba(0,0,0,0.2)", // stronger shadow for depth
        }}
      >
        <MessageInput chatId={chatId} />
      </Box>
    </Box>
  );
};
export default MessageThread;
