import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  fetchSkillAction,
} from "../features/community/actions/communityActions";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Grid,
  Paper,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import SkillList from "../features/skills/components/SkillList";

export default function PrivateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, skills, profileStatus, profileError, skillStatus } =
    useSelector((state) => state.community);

  useEffect(() => {
    const loggedInUserId = 3; // Replace with actual auth user ID
    dispatch(fetchProfileAction(loggedInUserId));
    dispatch(fetchSkillAction(loggedInUserId));
  }, [dispatch]);

  if (profileStatus === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (profileStatus === "failed") {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Error: {profileError}
      </Typography>
    );
  }

  if (!user) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Profile not found
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        px: 2,
        py: 5,
        bgcolor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 800,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          bgcolor: "white",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            mb: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: "primary.main",
                fontSize: 36,
              }}
            >
              {user.username[0]?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                {user.expertise || "No expertise specified"}
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" onClick={() => navigate("/profile")}>
            <Edit fontSize="medium" />
          </IconButton>
        </Box>

        {/* Bio */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            About
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {user.bio || "You haven’t added a bio yet."}
          </Typography>
        </Box>

        {/* Skills */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Your Skills
          </Typography>
          <SkillList userId={user.id} />
        </Box>

        {/* Followers / Following */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                py: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "#f5f7fa",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {user.followers?.length || 0}
              </Typography>
              <Typography color="text.secondary">Followers</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper
              elevation={2}
              sx={{
                py: 3,
                textAlign: "center",
                borderRadius: 3,
                bgcolor: "#f5f7fa",
              }}
            >
              <Typography variant="h6" fontWeight="bold" color="primary.main">
                {user.following?.length || 0}
              </Typography>
              <Typography color="text.secondary">Following</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
