import MessageThread from "./MessageThread";
import { IconButton, Typography, Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import VideoCallIcon from "@mui/icons-material/VideoCall";
// import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
const ChatRoom = () => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "";

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
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
        Video Call
      </Button>
      <MessageThread chatPartner={{ username }} />
    </Box>
  );
};
export default ChatRoom;
