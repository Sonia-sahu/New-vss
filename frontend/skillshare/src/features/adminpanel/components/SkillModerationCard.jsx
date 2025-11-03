import { useState } from "react";
import { useDispatch } from "react-redux";
import { moderateSkill } from "../actions/adminActions";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

export default function SkillModerationCard({ skill }) {
  const dispatch = useDispatch();
  const [action, setAction] = useState("approved");
  const [reason, setReason] = useState("");

  const handleModerate = () => {
    dispatch(moderateSkill({ id: skill.id, data: { action, reason } }));
  };

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{skill.title}</Typography>
        <Typography variant="body2">{skill.description}</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            select
            label="Action"
            value={action}
            onChange={(e) => setAction(e.target.value)}
          >
            {["approved", "removed", "flagged"].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <Button variant="contained" onClick={handleModerate}>
            Submit Moderation
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
