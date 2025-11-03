import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useState } from "react";

import { Await, useNavigate } from "react-router-dom";
import { loginUser } from "../actions/authActions";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ email:"", password:"" });

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
      navigate("/profile"); // Redirect after login
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
        Login
      </Typography>

      <TextField
        fullWidth
        label="email"
        name="email"
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
       <Typography color="error">
    {typeof error === 'object' ? error.non_field_errors?.join(', ') : error}
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
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
}
