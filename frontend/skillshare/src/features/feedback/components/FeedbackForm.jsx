// src/components/FeedbackForm.jsx

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { submitWorkshopFeedback } from "../features/feedback/actions/feedbackActions";

const FeedbackForm = ({ workshopId }) => {
  const [feedback, setFeedback] = useState("");
  const dispatch = useDispatch();

  const handleFeedbackChange = (e) => setFeedback(e.target.value);

  const handleSubmit = () => {
    dispatch(submitWorkshopFeedback({ workshopId, feedback }));
  };

  return (
    <div>
      <TextField
        label="Provide your feedback"
        multiline
        rows={4}
        value={feedback}
        onChange={handleFeedbackChange}
        variant="outlined"
        fullWidth
      />
      <Button onClick={handleSubmit} variant="contained">
        Submit Feedback
      </Button>
    </div>
  );
};

export default FeedbackForm;
