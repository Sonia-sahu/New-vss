import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import { Menu as MenuIcon, Notifications, Logout } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/slice/authSlice";
import { useTheme } from "@mui/material/styles";
export default function Navbar({ toggleSidebar = () => {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth?.user);

  if (!token) return null;

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
          <IconButton color="inherit" onClick={handleNotificationClick}>
            <Notifications />
          </IconButton>
          <Avatar
            alt={user?.username || "User"}
            src={user?.avatar || ""}
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
