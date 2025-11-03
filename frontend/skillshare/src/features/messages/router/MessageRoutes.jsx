import { Routes, Route } from "react-router-dom";
import MessagePage from "../../../pages/MessagePage";

export default function MessageRoutes() {
  return (
    <Routes>
      <Route path="/messages" element={<MessagePage />} />
    </Routes>
  );
}
