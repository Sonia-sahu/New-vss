import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import {
  Group,
  Chat,
  School,
  Feedback,
  VideoLibrary,
} from "@mui/icons-material";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const sections = [
    {
      title: "Community",
      description: "Connect and collaborate with others.",
      icon: <Group fontSize="large" color="primary" />,
      path: "/community",
    },
    // {
    //   title: "Messages",
    //   description: "Chat with your connections.",
    //   icon: <Chat fontSize="large" color="primary" />,
    //   path: "/messages",
    // },
    {
      title: "Workshops",
      description: "Host or attend skill-sharing sessions.",
      icon: <School fontSize="large" color="primary" />,
      path: "/workshops",
    },
    {
      title: "Feedback",
      description: "Share your feedback to improve the platform.",
      icon: <Feedback fontSize="large" color="primary" />,
      path: "/feedback",
    },
    {
      title: "Tutorials",
      description: "Share your knowledge by posting tutorials.",
      icon: <VideoLibrary fontSize="large" color="primary" />,
      path: "/community/tutorials/submit",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        color: "#f3f4f6",
      }}
    >
      {/*   Welcome Section */}
      <Box sx={{ px: 4, mb: 4 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", color: "#ffffff", textAlign: "left" }}
        >
          Welcome, {user?.username || "User"} 👋
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#ccc", mt: 1, textAlign: "left" }}
        >
          Manage your skills, connect with others, and explore opportunities!
        </Typography>
      </Box>

      {/*   Dashboard Cards */}
      <Box sx={{ px: 4 }}>
        <Grid container spacing={3} justifyContent="center">
          {sections.map((section, index) => (
            <Grid key={index} item>
              <Card
                onClick={() => navigate(section.path)}
                sx={{
                  width: 280, //   Fixed width
                  height: 220, //   Fixed height
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "0.3s",
                  bgcolor: "#1f3b73cc", // Semi-transparent blue)",
                  borderRadius: 3,
                  backdropFilter: "blur(6px)",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                  "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
                  {section.icon}
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, color: "#fff", fontWeight: 600 }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 1,
                      color: "#ccc",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {section.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
