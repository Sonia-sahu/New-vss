import NotificationList from "../features/notifications/components/NotificationList";
import { Container, Typography } from "@mui/material";

export default function NotificationPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Notifications
      </Typography>
      <NotificationList />
    </Container>
  );
}
