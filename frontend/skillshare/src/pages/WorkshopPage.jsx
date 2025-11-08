import WorkshopForm from "../features/workshops/components/WorkshopForm";
import WorkshopList from "../features/workshops/components/WorkshopList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function WorkshopPage() {
  const navigate = useNavigate();
  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Workshops
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ width: 600, mx: "auto" }}>
          <WorkshopForm />
        </Box>
      </LocalizationProvider>

      {/* <WorkshopList /> */}
    </Container>
  );
}
