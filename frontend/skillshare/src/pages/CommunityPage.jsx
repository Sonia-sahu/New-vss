// pages/CommunityPage.js
import { useState } from "react";
import { Container, Divider, Typography, Box, Button } from "@mui/material";
import ExploreUsersList from "../features/community/components/ExploreUsersList";
import WorkshopGallery from "../features/workshops/components/WorkshopGallery";
import SearchBar from "../features/community/components/SearchBar";
import TutorialFeed from "../features/community/components/TutorialFeed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { fetchTutorials } from "../features/community/actions/communityActions";
import { useNavigate } from "react-router-dom";
export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchTutorials()); // ✅ Load tutorials on page load
  }, [dispatch]);
  // 🔹 Filter tutorials from followed mentors

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Explore Community
      </Typography>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ExploreUsersList searchTerm={searchTerm} />
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Master New Skills with These Expert-Led Tutorials
      </Typography>
      <TutorialFeed /> {/* ✅ New tutorial section */}
      <Divider sx={{ my: 4 }} />
      <Typography variant="h5" gutterBottom>
        Workshops
      </Typography>
      <WorkshopGallery />
    </Container>
  );
}
