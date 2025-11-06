import ExploreUsersList from "../features/community/components/ExploreUsersList";
import { Container, Divider, Typography } from "@mui/material";
import WorkshopGallery from "../features/workshops/components/WorkshopGallery";

export default function CommunityPage() {
  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Explore Community
      </Typography>

      <ExploreUsersList />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Workshops
      </Typography>

      <WorkshopGallery />
    </Container>
  );
}
