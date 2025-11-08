import React from "react";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Button,
  Stack,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    navigate("/notifications");
  };

  const handleAnalyticsClick = () => {
    navigate("analytics");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 3,
        mx: "auto",
        maxWidth: 800,
        mt: 4,
      }}
    >
      <Box
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        gap={2}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: 600, textAlign: { xs: "left", sm: "inherit" } }}
        >
          Welcome to the Admin Dashboard
        </Typography>
      </Box>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mt: 2, fontSize: { xs: "0.95rem", sm: "1rem" } }}
      >
        Use the navigation to manage users, review moderation logs, and oversee
        platform activity.
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mt: 4, justifyContent: "center" }}
      >
        <Button variant="contained" onClick={handleAnalyticsClick}>
          📈 View Analytics
        </Button>
      </Stack>
    </Paper>
  );
}
