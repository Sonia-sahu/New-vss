import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  useTheme,
  Link,
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
  const [formErrors, setFormErrors] = useState({});
  const [adminError, setAdminError] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAdminError("");
    setFormErrors({});

    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      const { access, refresh, user } = resultAction.payload;
      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);

      if (isAdmin && !user.is_admin) {
        setAdminError("You are not authorized to login as admin.");
        return;
      }

      navigate(user.is_admin && user.is_superuser ? "/admin" : "/dashboard");
    } else {
      setFormErrors(validateLoginForm(form, isAdmin));
    }
  };
  //unwrap() is used to handle the promise returned by the dispatch function. It allows us to access the fulfilled or rejected value of the async thunk action directly, enabling easier error handling and response processing.
  return (
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
        Login
      </Typography>

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
              "&.Mui-focused fieldset": { borderColor: "#aaa", borderWidth: 2 },
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
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          variant="outlined"
          placeholder="Enter your password"
          error={!!formErrors.password}
          helperText={formErrors.password}
          InputLabelProps={{ shrink: false }}
          sx={{
            input: { color: "#fff", fontSize: "1rem" },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "& fieldset": { borderColor: "#555" },
              "&:hover fieldset": { borderColor: "#888" },
              "&.Mui-focused fieldset": { borderColor: "#aaa", borderWidth: 2 },
            },
          }}
        />
        <Box sx={{ mt: 1, textAlign: "right" }}>
          <Link
            href="/forgot-password"
            underline="hover"
            sx={{ color: "#90caf9" }}
          >
            Forgot Password?
          </Link>
        </Box>
      </Box>

      {/* Admin Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            sx={{ color: "#ccc" }}
          />
        }
        label="Login as Admin"
        sx={{ color: "#ccc" }}
      />

      {/* Admin error */}
      {adminError && (
        <Typography color="error" variant="body2">
          {adminError}
        </Typography>
      )}

      {/* API error */}
      {error && (
        <Typography color="error" variant="body2">
          {typeof error === "object"
            ? error.non_field_errors?.join(", ")
            : error}
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
          textTransform: "none",
          background: "linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)",
          color: "#fff",
          boxShadow: "0 2px 8px rgba(30, 58, 138, 0.3)",
          "&:hover": {
            background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)",
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
