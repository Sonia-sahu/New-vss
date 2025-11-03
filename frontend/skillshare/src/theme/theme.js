import { createTheme } from "@mui/material/styles";

export function getTheme(mode = "light") {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: mode === "light" ? "#f5f5f5" : "#121212",
        paper: mode === "light" ? "#fff" : "#1e1e1e",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });
}
