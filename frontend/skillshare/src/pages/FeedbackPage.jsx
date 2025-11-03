import FeedbackList from "../features/feedback/components/FeedbackList";
import { Container, Typography } from "@mui/material";

export default function FeedbackPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Feedback Received
      </Typography>
      <FeedbackList />
    </Container>
  );
}
