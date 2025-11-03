import ExploreUsersList from "../features/community/components/ExploreUsersList";
import { Container, Typography } from "@mui/material";

export default function CommunityPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Explore Community
      </Typography>
      <ExploreUsersList />
    </Container>
  );
}
