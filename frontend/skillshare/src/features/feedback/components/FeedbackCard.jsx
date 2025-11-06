import {
  Card,
  CardContent,
  Typography,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";

export default function FeedbackCard({ feedback }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card sx={{ margin: 2, width: 300 }}>
        <CardContent>
          <Typography variant="subtitle1">
            From: {feedback.reviewer_username}
          </Typography>
          <Rating value={feedback.rating} readOnly />
          <Typography variant="body2" sx={{ mt: 1 }}>
            {feedback.comment || "No comment provided."}
          </Typography>
          <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
            {new Date(feedback.created_at).toLocaleString()}
          </Typography>
          <IconButton onClick={() => setOpen(true)} sx={{ mt: 1 }}>
            <InfoIcon />
          </IconButton>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Feedback Details</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2">
              Clarity: {feedback.clarity}, Engagement: {feedback.engagement}
            </Typography>
            <Typography variant="body2">
              Recommend: {feedback.recommend}, Usefulness: {feedback.usefulness}
            </Typography>
            <Typography variant="body2">
              Relevance: {feedback.relevance}/5
            </Typography>
          </Box>
          <Typography variant="body2">{feedback.comment}</Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
