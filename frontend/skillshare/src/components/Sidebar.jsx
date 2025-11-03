import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left">
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.label} component={Link} to={item.path}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
