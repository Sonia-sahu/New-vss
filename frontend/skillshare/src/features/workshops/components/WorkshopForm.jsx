import { useState } from "react";
import { useDispatch } from "react-redux";
import { createWorkshop } from "../actions/workshopActions";
import { TextField, Button, Box, MenuItem } from "@mui/material";

export default function WorkshopForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    skill: "",
    date: "",
    duration_minutes: 60,
    status: "upcoming",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => dispatch(createWorkshop(form));

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 4 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Description"
        name="description"
        multiline
        rows={3}
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Skill ID"
        name="skill"
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        fullWidth
        label="Duration (minutes)"
        name="duration_minutes"
        type="number"
        onChange={handleChange}
        margin="normal"
      />
      <TextField
        select
        fullWidth
        label="Status"
        name="status"
        value={form.status}
        onChange={handleChange}
        margin="normal"
      >
        {["upcoming", "completed", "cancelled"].map((status) => (
          <MenuItem key={status} value={status}>
            {status}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Create Workshop
      </Button>
    </Box>
  );
}
