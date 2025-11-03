import ModerationLogTable from "../features/adminpanel/components/ModerationLogTable";
import UserManagementTable from "../features/adminpanel/components/UserManagementTable";
import { Container, Typography } from "@mui/material";

export default function AdminPanelPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Admin Panel
      </Typography>
      <UserManagementTable />
      <ModerationLogTable />
    </Container>
  );
}
