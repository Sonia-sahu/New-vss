import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import VideoCall from "../features/messages/components/VideoCalls";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import SkillPage from "../pages/SkillPage";
import WorkshopPage from "../pages/WorkshopPage";
import FeedbackPage from "../pages/FeedbackPage";
import CommunityPage from "../pages/CommunityPage";
import NotificationPage from "../pages/NotificationPage";
import AdminPanelPage from "../pages/AdminPanelPage";
import PublicProfilePage from "../pages/PublicProfilePage";
import CommunityRoutes from "../features/community/router/communityRoutes";
import DashboardPage from "../pages/DashboardPage";
import PrivateProfilePage from "../pages/PrivateProfile";
import MessageRoutes from "../features/messages/router/MessageRoutes";
import ChatRoom from "../features/messages/components/ChatRoom";
import FeedbackForm from "../features/feedback/components/FeedbackForm";

export default function AppRouter() {
  const { token, user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute isAuthenticated={!!token} />}>
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/*"
          element={
            <DashboardLayout>
              <CommunityRoutes />
            </DashboardLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/private-profile"
          element={
            <DashboardLayout>
              <PrivateProfilePage />
            </DashboardLayout>
          }
        />
        <Route
          path="/skills"
          element={
            <DashboardLayout>
              <SkillPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/workshops"
          element={
            <DashboardLayout>
              <WorkshopPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/messages/*"
          element={
            <DashboardLayout>
              <MessageRoutes />
            </DashboardLayout>
          }
        />
        <Route
          path="/chat-room/:chatId"
          element={
            <DashboardLayout>
              <ChatRoom />
            </DashboardLayout>
          }
        />
        <Route
          path="/video-call/:chatId"
          element={
            <DashboardLayout>
              <VideoCall />
            </DashboardLayout>
          }
        />

        <Route
          path="/feedback"
          element={
            <DashboardLayout>
              <FeedbackPage />
            </DashboardLayout>
          }
        />
        <Route
          path="/workshop/:workshopId/feedback"
          element={
            <DashboardLayout>
              <FeedbackForm />
            </DashboardLayout>
          }
        />
        <Route
          path="/notifications"
          element={
            <DashboardLayout>
              <NotificationPage />
            </DashboardLayout>
          }
        />
        <Route path="/*" element={<CommunityRoutes />} />
      </Route>

      <Route path="/public-profile" element={<PublicProfilePage />} />
      <Route
        path="/admin"
        element={<ProtectedRoute isAuthenticated={!!token && user?.is_admin} />}
      >
        <Route
          index
          element={
            <DashboardLayout>
              <AdminPanelPage />
            </DashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
}
