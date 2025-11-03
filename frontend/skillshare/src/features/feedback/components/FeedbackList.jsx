import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReceivedFeedback } from "../actions/feedbackActions";
import FeedbackCard from "./FeedbackCard";
import { Box } from "@mui/material";

export default function FeedbackList() {
  const dispatch = useDispatch();
  const feedbacks = useSelector((state) => state.feedback.feedbacks);

  useEffect(() => {
    dispatch(fetchReceivedFeedback());
  }, [dispatch]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {feedbacks.map((fb) => (
        <FeedbackCard key={fb.id} feedback={fb} />
      ))}
    </Box>
  );
}
