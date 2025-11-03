import { Card, CardContent, Typography } from "@mui/material";
import WorkshopStatusBadge from "./WorkshopStatusBadge";

export default function WorkshopCard({ workshop }) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{workshop.title}</Typography>
        <Typography variant="body2">{workshop.description}</Typography>
        <Typography variant="caption">Date: {workshop.date}</Typography>
        <Typography variant="caption">
          Duration: {workshop.duration_minutes} mins
        </Typography>
        <WorkshopStatusBadge status={workshop.status} />
      </CardContent>
    </Card>
  );
}
