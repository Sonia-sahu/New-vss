import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  Home,
  Person,
  Build,
  School,
  Chat,
  Feedback,
  Group,
  AdminPanelSettings,
} from "@mui/icons-material";

const navItems = [
  { label: "Home", path: "/dashboard", icon: <Home /> },
  { label: "Edit Profile", path: "/profile", icon: <Person /> },
  { label: "Add Skills", path: "/skills", icon: <Build /> },
  { label: "Host Workshops", path: "/workshops", icon: <School /> },
  { label: "Messages", path: "/messages", icon: <Chat /> },
  { label: "Feedbacks Received", path: "/feedback", icon: <Feedback /> },
  { label: "Community", path: "/community", icon: <Group /> },

  { label: "Admin", path: "/admin", icon: <AdminPanelSettings /> },
];

export default function Sidebar({ open, toggleSidebar }) {
  return (
    <>
      <Drawer variant="persistent" anchor="left" open={open}>
        <Box sx={{ width: 240 }}>
          <IconButton onClick={toggleSidebar} sx={{ m: 1 }}>
            <CloseIcon />
          </IconButton>
          <List>
            {navItems.map((item) => (
              <ListItem
                button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                {item.icon}
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
