import { Card, CardContent, Typography } from "@mui/material";

export default function SkillCard({ skill }) {
  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography variant="h6">{skill.title}</Typography>
        <Typography variant="body2">{skill.description}</Typography>
        <Typography variant="caption">Category: {skill.category}</Typography>
      </CardContent>
    </Card>
  );
}
