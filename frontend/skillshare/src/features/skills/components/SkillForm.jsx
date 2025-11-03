import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSkill } from "../actions/skillActions";
import { TextField, Button, Box, MenuItem } from "@mui/material";

export default function SkillForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "tech",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = () => dispatch(createSkill(form));

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
        select
        fullWidth
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        margin="normal"
      >
        {["tech", "art", "cooking", "music", "other"].map((cat) => (
          <MenuItem key={cat} value={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Create Skill
      </Button>
    </Box>
  );
}
