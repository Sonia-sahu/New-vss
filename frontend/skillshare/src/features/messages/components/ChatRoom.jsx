import MessageThread from "./MessageThread";
import { IconButton, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const ChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "";

  return (
    <Box
      sx={{
        px: { xs: 1, sm: 2 },
        py: 2,
        width: "100%",
        maxWidth: {
          xs: "100%",
          sm: "95%",
          md: "900px",
          lg: "1000px",
        },
        mx: "auto",
      }}
    >
      {/* Header with Back and Connect */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>
            Chatting with {username || `User ${chatId}`}
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<VideoCallIcon />}
          onClick={() =>
            navigate(`/video-call/${chatId}`, { state: { username } })
          }
        >
          Connect
        </Button>
      </Box>

      {/* Message before Connect */}
      <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
        Ready to take this conversation further? Connect one-on-one for a
        focused mentoring session and get personalized guidance.
      </Typography>

      {/* Chat Thread */}
      <MessageThread chatPartner={{ username }} />
    </Box>
  );
};

export default ChatRoom;
