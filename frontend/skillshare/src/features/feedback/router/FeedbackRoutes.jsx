import { Routes, Route } from "react-router-dom";
import FeedbackPage from "../../../pages/FeedbackPage";
import FeedbackForm from "../components/FeedbackForm";

export default function FeedbackRoutes() {
  return (
    <Routes>
      <Route path="/feedback" element={<FeedbackPage />} />
      <Route path="/workshop/:workshopId/feedback" element={<FeedbackForm />} />
    </Routes>
  );
}
