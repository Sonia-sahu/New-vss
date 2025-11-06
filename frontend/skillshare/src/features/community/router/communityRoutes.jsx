import { Routes, Route } from "react-router-dom";
import CommunityPage from "../../../pages/CommunityPage";
import ProfilePage from "../../../features/community/components/ProfilePage";
import PublicProfilePage from "../../../pages/PublicProfilePage";
import TutorialFeed from "../components/TutorialFeed";
import SubmitTutorial from "../components/SubmitTutorial";
import TutorialPage from "../components/TutorialPage";

/**
 * Handles all community-related routes
 * Accessible inside protected user routes
 */
export default function CommunityRoutes() {
  return (
    <Routes>
      {/* 🏠 Explore all users / main community feed */}
      <Route path="/community" element={<CommunityPage />} />

      {/* 👤 Logged-in user's own profile */}
      <Route path="/community/profile" element={<ProfilePage />} />

      {/* 🌐 Public profile (other users) */}
      <Route path="/community/profile/:id" element={<PublicProfilePage />} />

      {/* 📚 Community tutorials */}
      <Route path="/community/tutorials" element={<TutorialFeed />} />

      {/* ✍️ Submit a tutorial */}
      <Route path="/community/tutorials/submit" element={<SubmitTutorial />} />

      {/* ▶️ Watch a tutorial */}
      <Route
        path="/community/tutorials/:tutorialId"
        element={<TutorialPage />}
      />
    </Routes>
  );
}
