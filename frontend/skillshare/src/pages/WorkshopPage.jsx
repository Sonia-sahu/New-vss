import WorkshopForm from "../features/workshops/components/WorkshopForm";
import WorkshopList from "../features/workshops/components/WorkshopList";
import { Container, Typography } from "@mui/material";

export default function WorkshopPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Workshops
      </Typography>
      <WorkshopForm />
      <WorkshopList />
    </Container>
  );
}
