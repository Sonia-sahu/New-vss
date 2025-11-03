import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../actions/authActions";

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
      navigate("/login"); // redirect after successful registration
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 6,
        p: 3,
        boxShadow: 3,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Create Account
      </Typography>

      <TextField
        fullWidth
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        margin="normal"
        required
      />

      <TextField
        fullWidth
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        margin="normal"
        required
      />

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
        color="primary"
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
      </Button>
    </Box>
  );
}
