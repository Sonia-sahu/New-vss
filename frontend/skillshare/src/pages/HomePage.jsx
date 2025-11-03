// pages/HomePage.jsx
import { Container, Grid, Typography, Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingSpinner from "../components/LoadingSpinner";
import { keyframes } from "@emotion/react";
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;
export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  if (loading) return <LoadingSpinner />;
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `
        linear-gradient(135deg, rgba(12, 35, 64, 0.9) 0%, rgba(24, 60, 115, 0.8) 100%),
        url('https://source.unsplash.com/1920x1080/?workspace,learning')
      `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        pt: "80px", // Space for fixed navbar
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center" sx={{ py: 8 }}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              animation: `${fadeIn} 0.8s ease-out`,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                fontWeight: 800,
                color: "white",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
                mb: 3,
              }}
            >
              Master New Horizons with SkillShare
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                color: "rgba(255,255,255,0.9)",
                fontWeight: 300,
                lineHeight: 1.6,
              }}
            >
              Join a vibrant community where skills meet passion. Teach, learn,
              and grow through interactive workshops and personalized mentoring.
            </Typography>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={3}
              justifyContent={{ xs: "center", md: "flex-start" }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: 2,
                  background:
                    "linear-gradient(45deg, #4ECDC4 30%, #45B7AF 90%)",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 24px rgba(78,205,196,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Start Learning
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/register")}
                sx={{
                  px: 5,
                  py: 2,
                  borderRadius: 2,
                  borderWidth: 2,
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  "&:hover": {
                    borderWidth: 2,
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Teach Skills
              </Button>
            </Stack>
            <Box mt={4}>
              <Typography
                variant="body1"
                sx={{ color: "rgba(255,255,255,0.8)" }}
              >
                Already part of our community?{" "}
                <Button
                  variant="text"
                  onClick={() => navigate("/login")}
                  sx={{
                    color: "#4ECDC4",
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": { color: "#3AB0A8" },
                  }}
                >
                  Sign In Here
                </Button>
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: `${loading ? "none" : "block"}`,
              animation: `${fadeIn} 0.8s ease-out 0.2s`,
              animationFillMode: "backwards",
            }}
          >
            <Box
              component="img"
              src="https://source.unsplash.com/featured/?education,technology"
              alt="Learning Community"
              sx={{
                width: "100%",
                borderRadius: 4,
                boxShadow: 16,
                transform: "rotate3d(0.5, 1, 0, 10deg)",
                "&:hover": {
                  transform: "rotate3d(0.5, 1, 0, 8deg) translateY(-4px)",
                },
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
