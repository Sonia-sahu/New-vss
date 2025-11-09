import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme"; // still using getTheme for flexibility

export default function ThemeProvider({ children }) {
  const theme = getTheme("dark"); //   force dark mode

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
