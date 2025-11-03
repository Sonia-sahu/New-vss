import { Routes, Route } from "react-router-dom";
import AdminPanelPage from "../../../pages/AdminPanelPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanelPage />} />
    </Routes>
  );
}
