import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email: "", password: "" });
  const [isAdmin, setIsAdmin] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      const { access, refresh } = resultAction.payload;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);

      if (
        resultAction.payload.user.is_admin &&
        resultAction.payload.user.is_superuser
      ) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: 600,
        mx: "auto",
        mt: 10,
        p: 5,
        borderRadius: 4,
        backgroundColor: "#2c3e65", // Solid slate blue-gray background
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "#ffffff",
          textAlign: "center",
        }}
      >
        Login
      </Typography>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "#ccc", mb: 0.5, fontWeight: "bold" }}
        >
          Email
        </Typography>
        <TextField
          fullWidth
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          variant="outlined"
          placeholder="Enter your email"
          InputLabelProps={{ shrink: false }}
          sx={{
            input: { color: "#fff", fontSize: "1rem" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#aaa",
                borderWidth: 2,
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography
          variant="body2"
          sx={{ color: "#ccc", mb: 0.5, fontWeight: "bold" }}
        >
          Password
        </Typography>
        <TextField
          fullWidth
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          variant="outlined"
          placeholder="Enter your password"
          InputLabelProps={{ shrink: false }}
          sx={{
            input: { color: "#fff", fontSize: "1rem" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#888",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#aaa",
                borderWidth: 2,
              },
            },
          }}
        />
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            sx={{ color: "#ccc" }}
          />
        }
        label="Login as Admin"
        sx={{ mt: 2, color: "#ccc" }}
      />

      {error && (
        <Typography color="error" variant="body2" mt={1}>
          {typeof error === "object"
            ? error.non_field_errors?.join(", ")
            : error}
        </Typography>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          mt: 3,
          py: 1.5,
          borderRadius: 2,
          fontSize: "1rem",
          fontWeight: 600,
          textTransform: "none", // Keeps text clean and readable
          background: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)", // Blue to deep indigo
          color: "#fff",
          boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)", // Subtle depth
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)", // Slightly deeper on hover
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
          },
          transition: "all 0.2s ease",
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
}
