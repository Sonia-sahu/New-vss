import { Routes, Route } from "react-router-dom";
import FeedbackPage from "../../../pages/FeedbackPage";

export default function FeedbackRoutes() {
  return (
    <Routes>
      <Route path="/feedback" element={<FeedbackPage />} />
    </Routes>
  );
}
