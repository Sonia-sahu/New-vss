import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        left: 0,
        position: "sticky",
        backgroundColor: "#364c76ff",
        color: "#f0f0f0",
        py: 3,
        px: { xs: 2, sm: 4 },
        borderTop: "1px solid #444",
        zIndex: 1100,
        overflowX: "hidden",
      }}
    >
      {/* Optional max-width wrapper to center content */}
      <Box
        sx={{
          maxWidth: "1200px",
          mx: "auto",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ textAlign: isMobile ? "center" : "left" }}
          >
            &copy; {new Date().getFullYear()} SkillHarbor. All rights reserved.
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            flexWrap="wrap"
            justifyContent="center"
          >
            <Link href="/privacy" underline="hover" color="inherit">
              Privacy Policy
            </Link>
            <Link href="/terms" underline="hover" color="inherit">
              Terms of Service
            </Link>
            <Link href="/contact" underline="hover" color="inherit">
              Contact Us
            </Link>
          </Stack>

          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              href="https://www.facebook.com/Sakshi-tadalgi"
              target="_blank"
              rel="noopener"
              aria-label="facebook"
              sx={{ color: "#f0f0f0", "&:hover": { color: "#1877f2" } }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://github.com/Sakshi-tadalgi"
              target="_blank"
              rel="noopener"
              aria-label="github"
              sx={{ color: "#f0f0f0", "&:hover": { color: "#333" } }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/sakshi-tadalgi"
              target="_blank"
              rel="noopener"
              aria-label="linkedin"
              sx={{ color: "#f0f0f0", "&:hover": { color: "#0a66c2" } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
