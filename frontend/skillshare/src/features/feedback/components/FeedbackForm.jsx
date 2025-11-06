import {
  Box,
  Typography,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Rating,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { submitFeedback } from "../actions/feedbackActions";

export default function FeedbackForm() {
  const { workshopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const workshop = useSelector((state) =>
    state.workshops.workshops.find((w) => String(w.id) === workshopId)
  );

  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [clarity, setClarity] = useState("");
  const [engagement, setEngagement] = useState("");
  const [relevance, setRelevance] = useState(0);
  const [usefulness, setUsefulness] = useState("");
  const [comments, setComments] = useState("");

  const { user } = useSelector((state) => state.auth);

  const recipient = workshop?.host;
  const reviewer = user?.id;
  console.log(workshop.host);
  console.log("worshop id", workshopId);
  const handleSubmit = async () => {
    try {
      await dispatch(
        submitFeedback({
          workshopId,
          reviewer,
          recipient,
          rating,
          recommend,
          clarity,
          engagement,
          relevance,
          usefulness,
          comment: comments,
        })
      ).unwrap();

      navigate("/dashboard"); // Redirect after success
    } catch (err) {
      console.error("Feedback submission failed:", err);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Feedback for: {workshop?.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Hosted by: {workshop?.host_username}
      </Typography>

      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Overall experience rating</FormLabel>
          <Rating
            name="rating"
            value={rating}
            onChange={(e, newValue) => setRating(newValue)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Would you recommend this workshop to others?</FormLabel>
          <RadioGroup
            row
            value={recommend}
            onChange={(e) => setRecommend(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Was the content clear and easy to follow?</FormLabel>
          <RadioGroup
            row
            value={clarity}
            onChange={(e) => setClarity(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Was the session engaging and interactive?</FormLabel>
          <RadioGroup
            row
            value={engagement}
            onChange={(e) => setEngagement(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>
            How relevant was the content to your skill level?
          </FormLabel>
          <Rating
            name="relevance"
            value={relevance}
            onChange={(e, newValue) => setRelevance(newValue)}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <FormLabel>Did you find the workshop practically useful?</FormLabel>
          <RadioGroup
            row
            value={usefulness}
            onChange={(e) => setUsefulness(e.target.value)}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <TextField
          label="Any additional comments or suggestions?"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 3 }}
        />

        <Button variant="contained" onClick={handleSubmit}>
          Submit Feedback
        </Button>
      </Box>
    </Paper>
  );
}
