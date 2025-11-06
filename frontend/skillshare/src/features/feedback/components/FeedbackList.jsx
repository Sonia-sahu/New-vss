import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceivedFeedback } from "../actions/feedbackActions";
import FeedbackCard from "./FeedbackCard";
import FeedbackStats from "./FeedbackStats";
import { Box, Typography } from "@mui/material";

export default function FeedbackList() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.feedback.feedbacks);

  useEffect(() => {
    dispatch(fetchReceivedFeedback());
  }, [dispatch]);

  return (
    <>
      <FeedbackStats feedbacks={feedbacks} />
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Individual Feedback Entries
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {feedbacks.map((fb) => (
          <FeedbackCard key={fb.id} feedback={fb} />
        ))}
      </Box>
    </>
  );
}
