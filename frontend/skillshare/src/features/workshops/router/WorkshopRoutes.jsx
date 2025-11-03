import { Routes, Route } from "react-router-dom";
import WorkshopPage from "../../../pages/WorkshopPage";

export default function WorkshopRoutes() {
  return (
    <Routes>
      <Route path="/workshops" element={<WorkshopPage />} />
    </Routes>
  );
}
