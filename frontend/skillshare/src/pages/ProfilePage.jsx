import ProfileEditor from "../features/auth/components/ProfileEditor";
import UserSettingsForm from "../features/auth/components/UserSettingsForm";
import { Container, Typography } from "@mui/material";

export default function ProfilePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <ProfileEditor />
      <UserSettingsForm />
    </Container>
  );
}
