import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, updateProfile } from "../actions/authActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  IconButton,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/validateForm";

export default function ProfileEditor() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    bio: "",
    expertise: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [errors, setErrors] = useState({});

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
      });
      if (user.profile_picture) {
        setPreviewUrl(user.profile_picture);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const { isValid, errors: validationErrors } = validateForm(form, [
      "first_name",
      "last_name",
      "bio",
      "expertise",
    ]);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("last_name", form.last_name);
    formData.append("bio", form.bio);
    formData.append("expertise", form.expertise);
    if (selectedFile) {
      formData.append("profile_picture", selectedFile);
    }

    dispatch(updateProfile(formData));
  };

  const handleAddSkill = () => {
    navigate("/skills");
  };

  return (
    <Box sx={{ width: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Edit Profile
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
          error={!!errors.first_name}
          helperText={errors.first_name}
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
          error={!!errors.last_name}
          helperText={errors.last_name}
        />
        <TextField
          label="Bio"
          name="bio"
          multiline
          rows={3}
          value={form.bio}
          onChange={handleChange}
          error={!!errors.bio}
          helperText={errors.bio}
        />
        <TextField
          label="Expertise"
          name="expertise"
          value={form.expertise}
          onChange={handleChange}
          error={!!errors.expertise}
          helperText={errors.expertise}
        />

        <Typography variant="subtitle1">Upload Profile Picture</Typography>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <Typography variant="caption" color="text.secondary">
          Choose an image file from your device (JPG, PNG, etc.)
        </Typography>

        {previewUrl && (
          <Avatar
            src={previewUrl}
            alt="Profile Preview"
            sx={{ width: 80, height: 80 }}
          />
        )}

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleAddSkill}>
            Add Skills
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
