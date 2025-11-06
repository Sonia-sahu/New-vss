import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTutorial } from "../actions/communityActions";
import { TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SubmitTutorial = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const extractYouTubeId = (url) => {
    const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : "";
  };

  const handleSubmit = async () => {
    const thumbnailUrl = `https://img.youtube.com/vi/${extractYouTubeId(
      videoUrl
    )}/hqdefault.jpg`;
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
      navigate("/dashboard"); // ✅ Navigate after success
    } catch (error) {
      console.error("Tutorial submission failed:", error);
      // Optionally show error feedback
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="YouTube URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Tutorial
      </Button>
    </Box>
  );
};

export default SubmitTutorial;
