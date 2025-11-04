import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWorkshop } from "../actions/workshopActions";
import { fetchSkills } from "../../skills/actions/skillActions";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Typography,
  Paper,
  Stack,
  FormControlLabel,
  Switch,
} from "@mui/material";

export default function WorkshopForm() {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.skills);
  const { user } = useSelector((state) => state.auth); // assuming auth slice has user info

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    duration_minutes: 60,
    status: "upcoming",
    created_at: new Date().toISOString().slice(0, 10),
    host_id: "",
    skill_id: "",
    enable_live_session: false,
    meeting_room_name: "",
    meeting_url: "",
  });

  useEffect(() => {
    dispatch(fetchSkills());
  }, [dispatch]);

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({ ...prev, host_id: user.id }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "skill_id" ? parseInt(value) : value,
    });
  };

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    const roomName = checked ? `workshop-${Date.now()}` : "";
    const meetingUrl = checked ? `https://meet.jit.si/${roomName}` : "";

    setForm({
      ...form,
      [name]: checked,
      meeting_room_name: roomName,
      meeting_url: meetingUrl,
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      "id",
      "title",
      "description",
      "date",
      "skill_id",
      "host_id",
    ];
    const missing = requiredFields.filter((field) => !form[field]);

    if (missing.length > 0) {
      alert(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    dispatch(createWorkshop(form));
  };

  return (
    <Paper elevation={3} sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Workshop
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Workshop ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
        />
        <TextField
          select
          label="Skill"
          name="skill_id"
          value={form.skill_id}
          onChange={handleChange}
          fullWidth
          disabled={loading}
          helperText={loading ? "Loading skills..." : "Select a skill"}
        >
          <MenuItem value="" disabled>
            -- Select a skill --
          </MenuItem>
          {skills.map((skill) => (
            <MenuItem key={skill.id} value={skill.id}>
              {skill.name || skill.title || `Skill ${skill.id}`}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
        <TextField
          label="Duration (minutes)"
          name="duration_minutes"
          type="number"
          value={form.duration_minutes}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
        >
          {["upcoming", "completed", "cancelled"].map((status) => (
            <MenuItem key={status} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Host ID"
          name="host_id"
          value={form.host_id}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Created At"
          name="created_at"
          type="date"
          value={form.created_at}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <FormControlLabel
          control={
            <Switch
              checked={form.enable_live_session}
              onChange={handleSwitchChange}
              name="enable_live_session"
            />
          }
          label="Enable Live Session"
        />

        {form.enable_live_session && (
          <>
            <TextField
              label="Meeting Room Name"
              name="meeting_room_name"
              value={form.meeting_room_name}
              onChange={handleChange}
              fullWidth
              helperText="This will be used to identify the meeting room"
            />
            <TextField
              label="Meeting URL"
              name="meeting_url"
              value={form.meeting_url}
              onChange={handleChange}
              fullWidth
              helperText="Full URL to the Jitsi meeting"
            />
          </>
        )}

        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Create Workshop
        </Button>
      </Stack>
    </Paper>
  );
}
