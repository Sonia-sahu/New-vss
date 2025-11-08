// // import { Box, Container } from "@mui/material";
// // import { useSelector } from "react-redux";

// // export default function DashboardLayout({ children }) {
// //   const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);

// //   return (
// //     <Box sx={{ display: "flex" }}>
// //       <Box sx={{ flexGrow: 1 }}>
// //         <Container sx={{ mt: 4 }}>{children}</Container>
// //       </Box>
// //     </Box>
// //   );
// // }
// import { Box, Container } from "@mui/material";
// import { useSelector } from "react-redux";
// import Navbar from "../components/Navbar";
// import {
//   connectNotificationsSocket,
//   disconnectNotificationsSocket,
// } from "../features/notifications/services/notificationService";
// import { useEffect } from "react";

// export default function DashboardLayout({ children }) {
//   const token = useSelector((state) => state.auth?.token);
//   const isAuthenticated = useSelector((state) => state.auth?.isLoggedIn);
//   const user = useSelector((state) => state.auth.user);
//   useEffect(() => {
//     if (user) {
//       connectNotificationsSocket(); // Start WebSocket connection when user is authenticated
//     } else {
//       disconnectNotificationsSocket(); // Disconnect if no user (logged out)
//     }

//     return () => disconnectNotificationsSocket(); // Cleanup on component unmount
//   }, [user]);

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
//       {token && <Navbar />}
//       <Box sx={{ flexGrow: 1, pt: token ? 8 : 0 }}>
//         <Container sx={{ mt: 4 }}>{children}</Container>
//       </Box>
//     </Box>
//   );
// }
import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // ✅ Import Sidebar
import {
  connectNotificationsSocket,
  disconnectNotificationsSocket,
} from "../features/notifications/services/notificationService";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  const token = useSelector((state) => state.auth?.token);
  const user = useSelector((state) => state.auth.user);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user) {
      connectNotificationsSocket();
    } else {
      disconnectNotificationsSocket();
    }
    return () => disconnectNotificationsSocket();
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {token && <Navbar toggleSidebar={toggleSidebar} />}
      {token && <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />}
      <Box sx={{ flexGrow: 1, pt: token ? 8 : 0 }}>
        <Container sx={{ mt: 4 }} maxWidth={false}>
          {children}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
