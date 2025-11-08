import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Typography,
  Avatar,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Container,
  Button,
  IconButton,
} from "@mui/material";
import SkillList from "../features/skills/components/SkillList";
import { fetchSkills } from "../features/skills/actions/skillActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorAlert from "../components/ErrorAlert";

export default function PublicProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const { skills } = useSelector((state) => state.skills);

  const profileImageUrl = profile?.profile_picture?.startsWith("http")
    ? profile.profile_picture
    : profile?.profile_picture
    ? `http://127.0.0.1:8000${profile.profile_picture}`
    : "/default-profile.png";

  useEffect(() => {
    if (id) {
      dispatch(fetchSkills(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/community/profile/${id}/`);
        setProfile(res.data);

        const followRes = await API.get(`/community/is-following/${id}/`);
        setIsFollowing(followRes.data.is_following);
      } catch (error) {
        console.error("Error fetching public profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleStartChatting = () => {
    navigate(`/messages?user=${id}`);
  };

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
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
        <ErrorAlert message="User profile not found." />
      </Box>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
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
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-profile.png";
                }}
              >
                {!profileImageUrl && profile.username[0]?.toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                {profile.username}
              </Typography>
              <Typography variant="body2" color="#2c3e50">
                {profile.expertise || "No expertise specified"}
              </Typography>
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
                  {profile.followers?.length || 0}
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
                  {profile.following?.length || 0}
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
              {profile.bio || "This user hasn’t added a bio yet."}
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
              Skills
            </Typography>
            <SkillList skills={skills} />
          </Box>

          {/* Start Chatting Button */}
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                py: 1.2,
                fontWeight: "bold",
                fontSize: "1rem",
                bgcolor: "primary.main",
                color: "#fff",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
              }}
              onClick={handleStartChatting}
            >
              Say Hello and Start a Conversation
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
