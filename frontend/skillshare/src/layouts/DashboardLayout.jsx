import { Box, Container } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function DashboardLayout({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      {isAuthenticated && (
        <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <Box sx={{ flexGrow: 1 }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Container sx={{ mt: 10 }}>{children}</Container>
      </Box>
    </Box>
  );
}
