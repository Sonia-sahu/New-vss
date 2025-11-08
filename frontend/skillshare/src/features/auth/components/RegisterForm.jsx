import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Link,
  useMediaQuery,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerUser } from "../actions/authActions";
import { motion } from "framer-motion";
import { validateRegistrationForm } from "../../../utils/validateForm";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(registerUser(form));

    const errors = validateRegistrationForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

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
          width: "90%",
          maxWidth: 600,
          mx: "auto",
          mt: 8,
          p: isMobile ? 3 : 5,
          borderRadius: 4,
          backgroundColor: "#2c3e65",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.4)",
          fontFamily: "'Inter', sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          sx={{ fontWeight: 700, color: "#ffffff", textAlign: "center" }}
        >
          Create Account
        </Typography>

        {/* Username */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 0.5, fontWeight: "bold" }}
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
            error={!!formErrors.username}
            helperText={formErrors.username}
            InputLabelProps={{ shrink: false }}
            sx={{
              input: { color: "#fff", fontSize: "1rem" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": {
                  borderColor: "#aaa",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        {/* Email */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 0.5, fontWeight: "bold" }}
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
            error={!!formErrors.email}
            helperText={formErrors.email}
            InputLabelProps={{ shrink: false }}
            sx={{
              input: { color: "#fff", fontSize: "1rem" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": {
                  borderColor: "#aaa",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        {/* Password */}
        <Box>
          <Typography
            variant="body2"
            sx={{ color: "#ccc", mb: 0.5, fontWeight: "bold" }}
          >
            Password
          </Typography>
          <TextField
            fullWidth
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            variant="outlined"
            placeholder="Enter your password"
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputLabelProps={{ shrink: false }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                    sx={{ color: "#ccc" }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              input: { color: "#fff", fontSize: "1rem" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#888" },
                "&.Mui-focused fieldset": {
                  borderColor: "#aaa",
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

        {/* Server error or success */}
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" variant="body2">
            Registration successful! Redirecting to login...
          </Typography>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            fontSize: "1rem",
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)",
            color: "#fff",
            textTransform: "none",
            boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
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
          <Link
            component={RouterLink}
            to="/login"
            sx={{ color: "#fff", fontWeight: 600 }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
