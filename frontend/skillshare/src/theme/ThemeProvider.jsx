import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react";
import { getTheme } from "./theme";
const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeToggleContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeToggleContext.Provider>
  );
}
