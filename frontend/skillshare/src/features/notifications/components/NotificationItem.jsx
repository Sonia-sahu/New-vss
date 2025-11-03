import { Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import MarkAsReadButton from "./MarkAsReadButton";

export default function NotificationItem({ notification }) {
  return (
    <Card
      sx={{
        margin: 2,
        backgroundColor: notification.is_read ? "#f5f5f5" : "#fff",
      }}
    >
      <CardContent>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1">{notification.content}</Typography>
          <Chip label={notification.type} size="small" />
        </Stack>
        <Typography variant="caption">{notification.created_at}</Typography>
        {!notification.is_read && <MarkAsReadButton id={notification.id} />}
      </CardContent>
    </Card>
  );
}
