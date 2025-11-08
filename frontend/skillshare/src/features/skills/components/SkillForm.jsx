import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createSkill } from "../actions/skillActions";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../../../utils/validateForm";
import {
  Box,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Typography,
  Paper,
  FormHelperText,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Description, Title, Category, Upload } from "@mui/icons-material";

function SkillForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [certification, setCertification] = useState(null);
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});

  const handleCertificationChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setCertification(file);
      setFileName(file.name);
      setErrors((prev) => ({ ...prev, certification: "" }));
    } else {
      setCertification(null);
      setFileName("");
      setErrors((prev) => ({
        ...prev,
        certification: "Only PDF files are allowed.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = { title, description, category };
    const { isValid, errors: validationErrors } = validateForm(requiredFields, [
      "title",
      "description",
      "category",
    ]);

    if (!certification) {
      validationErrors.certification = "Certification is mandatory.";
    }

    if (!isValid || validationErrors.certification) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("certification", certification);
    formData.append("status", "in review");

    dispatch(createSkill(formData));
    navigate("/private-profile");
  };

  return (
    <Paper
      elevation={6}
      sx={{
        backgroundColor: "#aba7a7ff",
        p: 6,
        maxWidth: 800,
        width: "100%",
        mx: "auto",
        my: 8,
        borderRadius: 4,
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box textAlign="center" mb={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          Skill Submission Form
        </Typography>
        <Divider sx={{ my: 3 }} />
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Skill Title"
            variant="outlined"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: "" }));
            }}
            error={!!errors.title}
            helperText={errors.title}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Title color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Skill Description"
            variant="outlined"
            multiline
            rows={5}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors((prev) => ({ ...prev, description: "" }));
            }}
            error={!!errors.description}
            helperText={errors.description}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="Describe your skill in detail (minimum 50 characters)"
          />

          <FormControl fullWidth required error={!!errors.category}>
            <InputLabel id="category-label">Skill Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Skill Category"
              onChange={(e) => {
                setCategory(e.target.value);
                setErrors((prev) => ({ ...prev, category: "" }));
              }}
            >
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              <MenuItem value="tech">Technology</MenuItem>
              <MenuItem value="art">Art & Design</MenuItem>
              <MenuItem value="cooking">Culinary Arts</MenuItem>
              <MenuItem value="music">Music & Audio</MenuItem>
            </Select>
            {errors.category && (
              <FormHelperText>{errors.category}</FormHelperText>
            )}
          </FormControl>

          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              py: 2,
              borderStyle: "dashed",
              borderWidth: 2,
              "&:hover": { borderWidth: 2 },
            }}
            startIcon={<Upload />}
          >
            {fileName || "Upload Certification (PDF only)"}
            <input
              type="file"
              accept=".pdf"
              hidden
              onChange={handleCertificationChange}
            />
          </Button>

          <FormHelperText sx={{ textAlign: "center" }}>
            Maximum file size: 5MB • Accepted format: PDF
          </FormHelperText>

          {errors.certification && (
            <Typography
              color="error"
              align="center"
              sx={{
                bgcolor: "error.light",
                py: 1,
                borderRadius: 1,
              }}
            >
              ⚠️ {errors.certification}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 2,
              fontWeight: 700,
              fontSize: "1.1rem",
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            Submit for Verification
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default SkillForm;
