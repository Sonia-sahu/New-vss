import { Card, CardContent, Typography, Rating } from "@mui/material";

export default function FeedbackCard({ feedback }) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">
          From: {feedback.reviewer.username}
        </Typography>
        <Typography variant="body2">{feedback.comment}</Typography>
        <Rating value={feedback.rating} readOnly />
        <Typography variant="caption">{feedback.created_at}</Typography>
      </CardContent>
    </Card>
  );
}
