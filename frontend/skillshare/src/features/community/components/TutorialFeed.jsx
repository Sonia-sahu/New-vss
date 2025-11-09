import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTutorials } from "../actions/communityActions";
import TutorialCard from "./TutorialCard";
import { Grid, Typography } from "@mui/material";
import ErrorAlert from "../../../components/ErrorAlert";

const TutorialFeed = () => {
  const dispatch = useDispatch();
  const { tutorials, tutorialStatus } = useSelector((state) => state.community);

  useEffect(() => {
    dispatch(fetchTutorials());
  }, [dispatch]);

  if (tutorialStatus === "loading")
    return <Typography sx={{ p: 3 }}>Loading tutorials...</Typography>;
  if (!tutorials.length)
    return (
      <Grid container justifyContent="center" sx={{ px: 3, py: 4 }}>
        <Grid item xs={12} md={8}>
          <ErrorAlert message="No tutorials found." />
        </Grid>
      </Grid>
    );

  return (
    <Grid container spacing={3} sx={{ px: 3, py: 2 }}>
      {/*   Heading on one line */}
      <Grid item xs={12}>
        <Typography variant="h6">Watch Tutorials</Typography>
      </Grid>

      {/*   Cards below the heading */}
      {tutorials.map((tutorial) => (
        <Grid item key={tutorial.id} xs={12} sm={6} md={4} lg={3}>
          <TutorialCard tutorial={tutorial} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TutorialFeed;
