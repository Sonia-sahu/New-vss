import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/authActions";
import { motion } from "framer-motion";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate("/login");
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
          Create Account
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#ccc",
              mb: 0.5,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Username
          </Typography>
          <TextField
            fullWidth
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="Enter your username"
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
            sx={{
              color: "#ccc",
              mb: 0.5,
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Email
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
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
            sx={{
              color: "#ccc",
              mb: 0.5,
              fontWeight: "bold",
              textAlign: "left",
            }}
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

        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2" mt={1}>
            Registration successful! Redirecting to login...
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
            background: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)", // Blue to indigo gradient
            color: "#fff",
            textTransform: "none", // Keeps text readable and professional
            boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)", // Subtle shadow
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)", // Slightly deeper on hover
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(30, 58, 138, 0.4)",
            },
            transition: "all 0.2s ease",
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Create Account"
          )}
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 3, textAlign: "center", color: "#dcdbdbff" }}
        >
          Already have an account?{" "}
          <Link href="/login" sx={{ color: "#b6d1ecff" }}>
            login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
