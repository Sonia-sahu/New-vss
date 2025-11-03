import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../actions/authActions";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";

export default function ProfileEditor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    expertise: "",
    profile_picture: "",
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        bio: user.bio || "",
        expertise: user.expertise || "",
        profile_picture: user.profile_picture || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(updateProfile(form));
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Edit Profile
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Bio"
          name="bio"
          multiline
          rows={3}
          value={form.bio}
          onChange={handleChange}
        />
        <TextField
          label="Expertise"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
        />
        <TextField
          label="Profile Picture URL"
          name="profile_picture"
          value={form.profile_picture}
          onChange={handleChange}
        />
        {form.profile_picture && (
          <Avatar
            src={form.profile_picture}
            alt="Profile"
            sx={{ width: 80, height: 80 }}
          />
        )}
        <Button variant="contained" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Stack>
    </Box>
  );
}
