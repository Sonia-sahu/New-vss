import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTutorial } from "../actions/communityActions";
import { TextField, Button, Box, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/validateForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const SubmitTutorial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [errors, setErrors] = useState({});

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = async () => {
    const { isValid, errors: validationErrors } = validateForm(
      { title, description, videoUrl },
      ["title", "description", "videoUrl"]
    );

    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) {
      validationErrors.videoUrl = "Please enter a valid YouTube URL.";
    }

    if (!isValid || validationErrors.videoUrl) {
      setErrors(validationErrors);
      return;
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    const payload = {
      title,
      description,
      video_url: videoUrl,
      thumbnail_url: thumbnailUrl,
    };

    try {
      await dispatch(postTutorial(payload)).unwrap();
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setErrors({});
      navigate("/dashboard");
    } catch (error) {
      console.error("Tutorial submission failed:", error);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Submit a New Tutorial
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors((prev) => ({ ...prev, title: "" }));
        }}
        error={!!errors.title}
        helperText={errors.title}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setErrors((prev) => ({ ...prev, description: "" }));
        }}
        error={!!errors.description}
        helperText={errors.description}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="YouTube URL"
        value={videoUrl}
        onChange={(e) => {
          setVideoUrl(e.target.value);
          setErrors((prev) => ({ ...prev, videoUrl: "" }));
        }}
        error={!!errors.videoUrl}
        helperText={errors.videoUrl}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default SubmitTutorial;
