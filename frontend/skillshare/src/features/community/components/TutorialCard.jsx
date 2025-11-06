import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

const TutorialCard = ({ tutorial }) => {
  const openVideo = () => {
    window.open(tutorial.video_url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      sx={{
        width: 345,
        height: 400,
        m: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={tutorial.thumbnail_url}
        alt={tutorial.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="h6"
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {tutorial.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mt: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {tutorial.description}
        </Typography>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <Button fullWidth variant="outlined" onClick={openVideo}>
          Watch Tutorial
        </Button>
      </Box>
    </Card>
  );
};

export default TutorialCard;
