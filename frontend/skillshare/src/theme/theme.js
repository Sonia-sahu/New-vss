import { createTheme } from "@mui/material/styles";
export const getTheme = () =>
  createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#6a7fe6fa" },
      secondary: { main: "#6366f1" },
      background: {
        default: "#0c2340",
        paper: "rgba(255, 255, 255, 0.05)",
      },
      text: {
        primary: "#f3f4f6",
        secondary: "#ccc",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      button: {
        textTransform: "none",
        fontWeight: 600,
        fontSize: "1rem",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h5: {
            color: "#f3f4f6",
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
            letterSpacing: "0.5px",
          },
          h6: {
            color: "#f3f4f6",
            fontWeight: 600,
          },
          h4: {
            color: "#f3f4f6",
          },
          body1: {
            color: "#ccc",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "0.75rem 1.5rem",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            color: "#fff",
            transition: "all 0.2s ease",
            "&:hover": {
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
              background: "linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)",
            },
          },
        },
        variants: [
          {
            props: { variant: "custom" },
            style: {
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              borderRadius: 12,
              padding: "0.75rem 1.5rem",
              "&:hover": {
                background: "rgba(255,255,255,0.25)",
                boxShadow: "0 8px 24px rgba(0,98,255,0.3)",
                transform: "translateY(-2px)",
              },
            },
          },
        ],
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            // Applies to all Paper components including pickers
            backgroundColor: "#1e1e1e",
            color: "#ffffff",
          },
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          root: {
            "& .MuiPaper-root": {
              backgroundColor: "#1e1e1e",
              color: "#ffffff",
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              color: "#f3f4f6",
            },
            "& .MuiInputLabel-root": {
              color: "#ccc",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "#4f46e5",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderRadius: 12,
            border: "1px solid rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(6px)",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingTop: "2rem",
            paddingBottom: "2rem",
          },
        },
      },
      MuiBox: {
        defaultProps: {
          sx: {
            fontFamily: "'Inter', sans-serif",
            color: "#f3f4f6",
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: "#f3f4f6", //   Bright light color for icons
          },
        },
      },
    },
  });
