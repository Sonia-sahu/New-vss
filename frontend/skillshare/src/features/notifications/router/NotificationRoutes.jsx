import { Routes, Route } from "react-router-dom";
import NotificationPage from "../../../pages/NotificationPage";

export default function NotificationRoutes() {
  return (
    <Routes>
      <Route path="/notifications" element={<NotificationPage />} />
    </Routes>
  );
}
