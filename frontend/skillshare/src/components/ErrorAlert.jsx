import { Alert } from "@mui/material";

export default function ErrorAlert({
  message = "The requested resource was not found.",
}) {
  if (!message) return null;

  return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      {message}
    </Alert>
  );
}
