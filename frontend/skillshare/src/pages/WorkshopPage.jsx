import WorkshopForm from "../features/workshops/components/WorkshopForm";
import WorkshopList from "../features/workshops/components/WorkshopList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Box, Container, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function WorkshopPage() {
  return (
    <Container sx={{ mt: 4, mb: 5 }}>
      <Typography variant="h5" gutterBottom>
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
