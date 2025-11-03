import RegisterForm from "../features/auth/components/RegisterForm";
import { Container, Typography } from "@mui/material";

export default function RegisterPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <RegisterForm />
    </Container>
  );
}
