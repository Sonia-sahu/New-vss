import React from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Use the navigation to manage users, review moderation logs, and oversee
        platform activity.
      </Typography>
    </Paper>
  );
}
