import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeToggle } from "../theme/ThemeProvider";

export default function ThemeToggleButton() {
  const { mode, toggleTheme } = useThemeToggle();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </IconButton>
  );
}
