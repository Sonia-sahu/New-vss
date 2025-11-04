import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Profile", path: "/profile" },
  { label: "Skills", path: "/skills" },
  { label: "Workshops", path: "/workshops" },
  { label: "Messages", path: "/messages" },
  { label: "Feedback", path: "/feedback" },
  { label: "Community", path: "/community" },
  { label: "Notifications", path: "/notifications" },
  { label: "Admin", path: "/admin" },
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
              <ListItem button key={item.label} component={Link} to={item.path}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
