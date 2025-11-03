import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillAnalytics } from "../actions/skillActions";
import { Typography, Box } from "@mui/material";

export default function SkillAnalytics({ skillId }) {
  const dispatch = useDispatch();
  const analytics = useSelector((state) => state.skills.analytics[skillId]);

  useEffect(() => {
    dispatch(fetchSkillAnalytics(skillId));
  }, [dispatch, skillId]);

  if (!analytics) return null;

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">
        Learners: {analytics.learners_count}
      </Typography>
      <Typography variant="subtitle1">
        Average Rating: {analytics.average_rating}
      </Typography>
    </Box>
  );
}
