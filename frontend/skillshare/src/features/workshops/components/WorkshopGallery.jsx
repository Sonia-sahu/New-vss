import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Grid, Divider } from "@mui/material";
import WorkshopCard from "./WorkshopCard";
import { fetchWorkshops } from "../actions/workshopActions";
import { selectMyRegistrations } from "../slice/workshopSlice";

export default function WorkshopGallery() {
  const dispatch = useDispatch();
  const { workshops = [], loading } = useSelector((state) => state.workshops);
  const { user } = useSelector((state) => state.auth);
  const registrations = useSelector(selectMyRegistrations);

  useEffect(() => {
    dispatch(fetchWorkshops());
  }, [dispatch]);

  const registeredWorkshopIds = registrations
    .filter((reg) => reg.user === user?.id)
    .map((reg) => reg.workshop);

  const yourWorkshops = workshops.filter((w) =>
    registeredWorkshopIds.includes(w.id)
  );

  const otherWorkshops = workshops.filter(
    (w) => !registeredWorkshopIds.includes(w.id)
  );

  return (
    <Box sx={{ mt: 4 }}>
      {yourWorkshops.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            🎓 Your Workshops
          </Typography>
          <Grid container spacing={3}>
            {yourWorkshops.map((workshop) => (
              <Grid item key={workshop.id} xs={12} sm={6} md={4}>
                <WorkshopCard workshop={workshop} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {yourWorkshops.length > 0 && otherWorkshops.length > 0 && (
        <Divider sx={{ my: 5 }} />
      )}

      {otherWorkshops.length > 0 && (
        <>
          <Typography variant="h5">
            💡 Other Workshops You Might Like
          </Typography>
          <Grid container spacing={3}>
            {otherWorkshops.map((workshop) => (
              <Grid item key={workshop.id} xs={12} sm={6} md={4}>
                <WorkshopCard workshop={workshop} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
}
