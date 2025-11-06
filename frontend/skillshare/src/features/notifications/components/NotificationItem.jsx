import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import MarkAsReadButton from "./MarkAsReadButton";

export default function NotificationItem({ notification }) {
  if (!notification) return null; // Prevent rendering if notification is undefined

  const {
    is_read = false,
    content = "No content available",
    type = "Info",
    created_at = "Unknown date",
    id,
  } = notification;

  return (
    <Card
      sx={{
        margin: 2,
        backgroundColor: is_read ? "#f5f5f5" : "#fff",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1">{content}</Typography>
          <Chip label={type} size="small" />
        </Stack>
        <Typography variant="caption">{created_at}</Typography>
        {!is_read && id && <MarkAsReadButton id={id} />}
      </CardContent>
    </Card>
  );
}
