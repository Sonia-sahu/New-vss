import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  Button,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Logout } from "@mui/icons-material";
import { useEffect } from "react";
import { MdAnalytics } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/slice/authSlice";
import { useTheme } from "@mui/material/styles";
import { fetchUnreadCount } from "../features/notifications/actions/notificationActions";
export default function Navbar({ toggleSidebar = () => {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);
  const profileImageUrl = user?.profile_picture
    ? `http://127.0.0.1:8000${user.profile_picture}`
    : "/default-profile.png";
  console.log("Profile Image URL:", profileImageUrl);

  const unreadCount = useSelector(
    (state) => state.notifications?.unreadCount || 0
  );
  if (!token) return null;

  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfileClick = () => {
    navigate("/private-profile");
  };

  const handleNotificationClick = () => {
    navigate("/notifications");
  };
  const handleOnClick = () => {
    navigate("/analytics");
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#1f3b73", // ✅ Solid blue background
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            SkillShare Platform
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <MdAnalytics
            size={32}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
            onClick={handleOnClick}
          />
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Badge badgeContent={unreadCount} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <Avatar
            alt={user?.username || "User"}
            src={profileImageUrl}
            sx={{
              bgcolor: "secondary.main",
              cursor: "pointer",
              "&:hover": { transform: "scale(1.1)" },
            }}
            onClick={handleProfileClick}
          >
            {user?.username ? user.username[0].toUpperCase() : "U"}
          </Avatar>
          <IconButton color="inherit" onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
