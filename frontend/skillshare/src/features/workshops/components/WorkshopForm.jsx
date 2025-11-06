import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWorkshop } from "../actions/workshopActions";
import { fetchSkills } from "../../skills/actions/skillActions";
import { DateTimePicker } from "@mui/x-date-pickers";
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
import { toast } from "react-toastify";

export default function WorkshopForm() {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.skills);
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    date: new Date(),
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

    const isoDate = new Date(form.date).toISOString();

    const payload = {
      ...form,
      date: isoDate,
    };

    dispatch(createWorkshop(payload));
    toast.success("Workshop created successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 800,
        mx: "auto",
        mt: 5,
        p: { xs: 2, sm: 3, md: 4 },
        bgcolor: "#151f36ef", // ✅ Dark background
        color: "#ffffff",
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#ffffff" }}>
        Create New Workshop
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Workshop ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
        />
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
        />
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
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
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
        >
          <MenuItem value="" disabled>
            -- Select a skill --
          </MenuItem>
          {skills.map((skill) => (
            <MenuItem sx={{ color: "#fff" }} key={skill.id} value={skill.id}>
              {skill.name || skill.title || `Skill ${skill.id}`}
            </MenuItem>
          ))}
        </TextField>
        <DateTimePicker
          label="Workshop Date & Time"
          value={form.date}
          onChange={(newValue) => setForm({ ...form, date: newValue })}
          ampm
          minutesStep={5}
          disablePast
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              InputLabelProps={{ style: { color: "#ffffff" } }}
              InputProps={{ style: { color: "#ffffff" } }}
              sx={{ borderRadius: 1 }}
            />
          )}
        />
        <TextField
          label="Duration (minutes)"
          name="duration_minutes"
          type="number"
          value={form.duration_minutes}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
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
          InputLabelProps={{ style: { color: "#f9fafb" } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
        />
        <TextField
          label="Created At"
          name="created_at"
          type="date"
          value={form.created_at}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ style: { color: "#f9fafb", shrink: true } }}
          InputProps={{ style: { color: "#f9fafb" } }}
          sx={{ borderRadius: 1 }}
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
              InputLabelProps={{ style: { color: "#f9fafb" } }}
              InputProps={{ style: { color: "#f9fafb" } }}
              sx={{ borderRadius: 1 }}
            />
            <TextField
              label="Meeting URL"
              name="meeting_url"
              value={form.meeting_url}
              onChange={handleChange}
              fullWidth
              helperText="Full URL to the Jitsi meeting"
              InputLabelProps={{ style: { color: "#f9fafb" } }}
              InputProps={{ style: { color: "#f9fafb" } }}
              sx={{ borderRadius: 1 }}
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
