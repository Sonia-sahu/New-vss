import { Routes, Route } from "react-router-dom";
import SkillPage from "../../../pages/SkillPage";

export default function SkillRoutes() {
  return (
    <Routes>
      <Route path="/skills" element={<SkillPage />} />
    </Routes>
  );
}
