// src/pages/WorkshopDetailPage.jsx

import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkshopById,
  registerWorkshop,
} from "../features/workshops/actions/workshopActions";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Box, Chip } from "@mui/material";
import { useEffect, useState } from "react";

const WorkshopDetailPage = () => {
  const { workshopId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isTimeToJoin, setIsTimeToJoin] = useState(false);
  const { workshops, myRegistrations } = useSelector(
    (state) => state.workshops
  );
  const { user } = useSelector((state) => state.auth);

  const workshop = workshops.find((w) => w.id === Number(workshopId));

  useEffect(() => {
    dispatch(fetchWorkshopById(workshopId));
  }, [dispatch, workshopId]);

  useEffect(() => {
    if (workshop) {
      const startTime = new Date(workshop.date);
      const now = new Date();
      const fifteenMinsBefore = new Date(startTime - 15 * 60000);
      const endTime = new Date(
        startTime.getTime() + workshop.duration_minutes * 60000
      );
      setIsTimeToJoin(now >= fifteenMinsBefore && now <= endTime);
    }
  }, [workshop]);

  const handleJoinSession = () => {
    if (isTimeToJoin) {
      navigate(`/workshop/${workshopId}/join`);
    } else {
      alert("Session not yet available");
    }
  };

  const handleRegister = () => {
    dispatch(registerWorkshop({ workshop: workshopId }));
  };

  return (
    <div>
      <Typography variant="h4">{workshop?.title}</Typography>
      <Chip label={workshop?.status} color="primary" />
      <p>{workshop?.description}</p>

      <Box>
        {!isRegistered && (
          <Button variant="contained" onClick={handleRegister}>
            Register
          </Button>
        )}
        {isRegistered && isTimeToJoin && (
          <Button variant="contained" onClick={handleJoinSession}>
            Join Session
          </Button>
        )}
        {isRegistered && !isTimeToJoin && <p>Session will be available soon</p>}
      </Box>
    </div>
  );
};

export default WorkshopDetailPage;
