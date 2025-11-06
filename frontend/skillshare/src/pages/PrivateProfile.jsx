import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkillAction } from "../features/community/actions/communityActions";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Grid,
} from "@mui/material";
import { fetchSkills } from "../features/skills/actions/skillActions";
import SkillList from "../features/skills/components/SkillList";
import { fetchProfile } from "../features/auth/actions/authActions";
import EditIcon from "@mui/icons-material/Edit";

export default function PrivateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { profileStatus, profileError } = useSelector(
    (state) => state.community
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProfile(user));
    dispatch(fetchSkills(user));
  }, [dispatch]);

  if (profileStatus === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#2c3e65",
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
        backgroundColor: "#2c3e65",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          backgroundColor: "#2c3e65",
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
            <EditIcon />
          </IconButton>
        </Box>

        {/* Bio */}
        <Typography variant="subtitle1" fontWeight={600}>
          About
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
          {user.bio || "You haven’t added a bio yet."}
        </Typography>

        {/* Skills */}
        <Typography variant="subtitle1" fontWeight={600} mb={1}>
          Your Skills
        </Typography>
        <SkillList userId={user.id} />

        {/* Followers / Following */}
        <Grid container spacing={2} mt={4}>
          <Grid item xs={6}>
            <Box
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
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
