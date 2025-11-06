import { Routes, Route } from "react-router-dom";
import MessagePage from "../../../pages/MessagePage";
// import ChatRoom from "../components/ChatRoom";

export default function MessageRoutes() {
  return (
    <Routes>
      <Route index element={<MessagePage />} />
      {/* <Route path="/chat-room/:chatId" element={<ChatRoom />} /> */}
    </Routes>
  );
}
