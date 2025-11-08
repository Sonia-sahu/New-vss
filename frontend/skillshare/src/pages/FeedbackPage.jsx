import FeedbackList from "../features/feedback/components/FeedbackList";
import { Container, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
export default function FeedbackPage() {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: "left" }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "left" }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Feedback Dashboard
      </Typography>
      <FeedbackList />
    </Container>
  );
}
