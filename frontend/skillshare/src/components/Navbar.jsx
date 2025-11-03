import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import ThemeToggleButton from "./ThemeToggleButton";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
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
