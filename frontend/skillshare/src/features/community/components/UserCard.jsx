import { Card, CardContent, Typography, Avatar, Stack } from "@mui/material";
import FollowButton from "./FollowButton";

export default function UserCard({ user }) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={user.profile_picture} alt={user.username} />
          <Stack>
            <Typography variant="h6">{user.username}</Typography>
            <Typography variant="body2">{user.expertise}</Typography>
            <Typography variant="caption">{user.bio}</Typography>
          </Stack>
        </Stack>
        <FollowButton userId={user.id} />
      </CardContent>
    </Card>
  );
}
