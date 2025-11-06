import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const TutorialPage = () => {
  const location = useLocation();
  const tutorial = location.state?.tutorial;

  if (!tutorial) return <Typography>Invalid tutorial link.</Typography>;

  const embedUrl = tutorial.video_url.replace("watch?v=", "embed/");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{tutorial.title}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {tutorial.description}
      </Typography>
      <iframe
        width="100%"
        height="500"
        src={embedUrl}
        title={tutorial.title}
        frameBorder="0"
        allowFullScreen
      />
    </Box>
  );
};

export default TutorialPage;
