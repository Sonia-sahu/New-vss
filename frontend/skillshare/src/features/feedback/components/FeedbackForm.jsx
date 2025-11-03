import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitFeedback } from "../actions/feedbackActions";
import { TextField, Button, Box, MenuItem } from "@mui/material";

export default function FeedbackForm({ recipientId, workshopId }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    recipient: recipientId,
    workshop: workshopId,
    rating: 5,
    comment: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => dispatch(submitFeedback(form));

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <TextField
        select
        fullWidth
        label="Rating"
        name="rating"
        value={form.rating}
        onChange={handleChange}
        margin="normal"
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        fullWidth
        label="Comment"
        name="comment"
        multiline
        rows={3}
        value={form.comment}
        onChange={handleChange}
        margin="normal"
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit Feedback
      </Button>
    </Box>
  );
}
