import ChatRoom from "../features/messages/components/ChatRoom";
import { Container, Typography } from "@mui/material";

export default function MessagePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Messages
      </Typography>
      <ChatRoom roomName="global" />
    </Container>
  );
}
