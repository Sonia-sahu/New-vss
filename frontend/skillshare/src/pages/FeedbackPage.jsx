import FeedbackList from "../features/feedback/components/FeedbackList";
import { Container, Typography } from "@mui/material";

export default function FeedbackPage() {
  return (
    <Container sx={{ textAlign: "left" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        Feedback Dashboard
      </Typography>
      <FeedbackList />
    </Container>
  );
}
