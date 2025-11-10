import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  IconButton,
  Grid,
  Stack,
  Container,
  Paper,
} from "@mui/material";
import { fetchSkills } from "../features/skills/actions/skillActions";
import SkillList from "../features/skills/components/SkillList";
import EditIcon from "@mui/icons-material/Edit";
import API from "../services/api";

export default function PrivateProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.auth);
  const { skills } = useSelector((state) => state.skills);

  const profileImageUrl = user?.profile_picture
    ? `http://127.0.0.1:8000${user.profile_picture}`
    : "/default-profile.png";

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchSkills(user.id));

      const fetchProfile = async () => {
        try {
          const res = await API.get(`/community/profile/${user.id}/`);
          setProfile(res.data);
        } catch (error) {
          console.error("Error fetching private profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          backgroundColor: "#535455ff",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!profile) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        Profile not found
      </Typography>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Paper
          elevation={4}
          sx={{ p: { xs: 2, sm: 4 }, borderRadius: 4, bgcolor: "#cfcbcbff" }}
        >
          {/* Header Section */}
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={2}>
              <Avatar
                src={profileImageUrl}
                sx={{
                  width: { xs: 70, md: 100 },
                  height: { xs: 70, md: 100 },
                  fontSize: { xs: 28, md: 40 },
                  color: "#2c3e50",
                  bgcolor: "primary.main",
                }}
              >
                {user.username[0]?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                {user.username}
              </Typography>
              <Typography variant="body2" color="#2c3e50">
                {profile.expertise || "No expertise specified"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={2}>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton onClick={() => navigate("/profile")}>
                  <EditIcon sx={{ color: "#2c3e50" }} />
                </IconButton>
              </Box>
            </Grid>
          </Grid>

          {/* Followers / Following */}
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} sm={6}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ bgcolor: "#2c3e50", py: 1, px: 1, borderRadius: 1 }}
              >
                <Typography fontWeight="bold" color="#fff">
                  Followers
                </Typography>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    color: "#e4e1e7ff",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                >
                  {profile?.followers?.length || 0}
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ bgcolor: "#2c3e50", py: 1, px: 1, borderRadius: 1 }}
              >
                <Typography fontWeight="bold" color="#fff">
                  Following
                </Typography>
                <Box
                  sx={{
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                >
                  {profile?.following?.length || 0}
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Bio Section */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1" fontWeight={600} color="#2c3e50">
              About
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, color: "#2c3e50" }}
            >
              {profile.bio || "You haven’t added a bio yet."}
            </Typography>
          </Box>

          {/* Skills Section */}
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              mb={1}
              color="#2c3e50"
            >
              Your Skills
            </Typography>
            <SkillList skills={skills} isOwner={true} />{" "}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
