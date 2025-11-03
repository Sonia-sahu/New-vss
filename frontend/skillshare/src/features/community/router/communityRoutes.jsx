import { Routes, Route } from "react-router-dom";
import CommunityPage from "../../../pages/CommunityPage";

export default function CommunityRoutes() {
  return (
    <Routes>
      <Route path="/community" element={<CommunityPage />} />
    </Routes>
  );
}
