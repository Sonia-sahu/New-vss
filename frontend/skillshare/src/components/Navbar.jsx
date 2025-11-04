import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggleButton from "./ThemeToggleButton";
import { useSelector } from "react-redux";

export default function Navbar({ toggleSidebar }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <AppBar position="fixed">
      <Toolbar>
        {isAuthenticated && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SkillShare Platform
        </Typography>
        <Box>
          <ThemeToggleButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
