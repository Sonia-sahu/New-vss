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
import { useNavigate } from "react-router-dom";

export default function WorkshopForm() {
  const dispatch = useDispatch();
  const { skills, loading } = useSelector((state) => state.skills);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
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
      skill: form.skill_id,
    };

    dispatch(createWorkshop(payload))
      .unwrap()
      .then(() => {
        toast.success("Workshop created successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Failed to create workshop.");
        console.error("Create error:", error);
      });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: 1000, //   Increased width
        mx: "auto",
        mt: 5,
        p: 4,
        borderRadius: 2,
        bgcolor: "#a8a8a8ff",
      }}
    >
      <Typography variant="h5" gutterBottom sx={{ color: "#313454ff" }}>
        Create New Workshop
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Workshop ID"
          name="id"
          value={form.id}
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
        />
        <TextField
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ color: "#313454ff" }}
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
        />

        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
        />

        <TextField
          select
          label="Skill"
          name="skill_id"
          value={form.skill_id}
          onChange={handleChange}
          fullWidth
          disabled={loading}
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
          helperText={loading ? "Loading skills..." : "Select a skill"}
          SelectProps={{
            MenuProps: {
              PaperProps: {
                sx: {
                  bgcolor: "#696868ff",
                  color: "#242334ff",
                },
              },
            },
          }}
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
              sx={{
                "& .MuiInputBase-input": {
                  color: "#123043ff", // soft blue for input text
                },
                "& .MuiInputLabel-root": {
                  color: "#123043ff", // soft blue for label
                },
              }}
            />
          )}
          PopperProps={{
            sx: {
              "& .MuiPaper-root": {
                backgroundColor: "#1e1e1e",
                color: "#2f3050ff",
              },
              "& .MuiPickersDay-root": {
                color: "#2c2121ff",
              },
              "& .MuiTypography-root": {
                color: "#272342ff",
              },
            },
          }}
        />
        <TextField
          label="Duration (minutes)"
          name="duration_minutes"
          type="number"
          value={form.duration_minutes}
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
        />
        <TextField
          select
          label="Status"
          name="status"
          value={form.status}
          onChange={handleChange}
          fullWidth
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
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
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
        />
        <TextField
          label="Created At"
          name="created_at"
          type="date"
          value={form.created_at}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInputBase-input": {
              color: "#123043ff", // soft blue for input text
            },
            "& .MuiInputLabel-root": {
              color: "#123043ff", // soft blue for label
            },
          }}
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
              sx={{
                "& .MuiInputBase-input": {
                  color: "#123043ff", // soft blue for input text
                },
                "& .MuiInputLabel-root": {
                  color: "#123043ff", // soft blue for label
                },
              }}
            />
            <TextField
              label="Meeting URL"
              name="meeting_url"
              value={form.meeting_url}
              onChange={handleChange}
              fullWidth
              helperText="Full URL to the Jitsi meeting"
              sx={{
                "& .MuiInputBase-input": {
                  color: "#123043ff", // soft blue for input text
                },
                "& .MuiInputLabel-root": {
                  color: "#123043ff", // soft blue for label
                },
              }}
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
