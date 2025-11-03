import { Typography, Container } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Welcome to SkillShare</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Learn, teach, and connect through workshops and skill-sharing.
      </Typography>
    </Container>
  );
}
