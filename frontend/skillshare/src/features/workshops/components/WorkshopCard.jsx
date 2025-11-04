import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
} from "@mui/material";
import {
  fetchMyRegistrations,
  registerWorkshop,
} from "../actions/workshopActions";
import WorkshopStatusBadge from "./WorkshopStatusBadge";
import { selectMyRegistrations } from "../slice/workshopSlice";

export default function WorkshopCard({ workshop }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isTimeToJoin, setIsTimeToJoin] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // local state to track registration

  const { user: currentUser } = useSelector((state) => state.auth);
  const userRegistrations = useSelector(selectMyRegistrations);

  useEffect(() => {
    // Fetch registrations on initial load
    if (currentUser) {
      dispatch(fetchMyRegistrations());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser && userRegistrations.length) {
      const registered = userRegistrations.some(
        (reg) =>
          Number(reg.workshop) === Number(workshop.id) &&
          Number(reg.user) === Number(currentUser.id)
      );
      setIsRegistered(registered);
      console.log("User Registrations after fetch:", userRegistrations);
    }
  }, [userRegistrations, workshop, currentUser]);

  // Time-to-join logic
  useEffect(() => {
    const workshopDate = new Date(workshop.date);
    const now = new Date();
    const timeDiff = workshopDate - now;
    const workshopEndTime = new Date(
      workshopDate.getTime() + workshop.duration_minutes * 60000
    );

    const isBeforeEnd = now < workshopEndTime;
    const isAfterStart = timeDiff <= 15 * 60000;

    setIsTimeToJoin(isAfterStart && isBeforeEnd);
  }, [workshop]);

  const handleJoinSession = () => {
    navigate(`/workshop/${workshop.id}/join`);
  };

  const handleRegister = () => {
    dispatch(registerWorkshop({ workshop: workshop.id }))
      .unwrap()
      .then(() => {
        // After successful registration, fetch user registrations again
        dispatch(fetchMyRegistrations())
          .unwrap()
          .then(() => {
            console.log(
              "Fetched Registrations after Register:",
              userRegistrations
            );
            // Update isRegistered after fetching
            const registered = userRegistrations.some(
              (reg) =>
                Number(reg.workshop) === Number(workshop.id) &&
                Number(reg.user?.id) === Number(currentUser.id)
            );
            setIsRegistered(registered);
            toast.success(" Successfully registered!");
          });
      })
      .catch((err) => {
        toast.error("Already registered or failed.");
        console.error("Registration error:", err);
      });
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Typography variant="h5">{workshop.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {workshop.description}
        </Typography>

        <Box sx={{ mt: 1, mb: 1 }}>
          <Typography variant="body2">
            Date: {new Date(workshop.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Time: {new Date(workshop.date).toLocaleTimeString()}
          </Typography>
          <Typography variant="body2">
            Duration: {workshop.duration_minutes} minutes
          </Typography>
        </Box>

        <Box sx={{ mt: 1 }}>
          <WorkshopStatusBadge status={workshop.status} />
        </Box>

        {workshop.enable_live_session && (
          <Typography variant="body2" color="primary" sx={{ mt: 1 }}>
            Live Session Available
          </Typography>
        )}
      </CardContent>

      <CardActions>
        {/* --- REGISTER BUTTON --- */}
        {!isRegistered && workshop.status === "upcoming" && (
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleRegister}
          >
            Register
          </Button>
        )}

        {/* --- SHOW REGISTERED STATE --- */}
        {console.log("Is Registered:", isRegistered)}
        {isRegistered && workshop.status === "upcoming" && (
          <Button size="small" variant="outlined" disabled color="success">
            ✅ Enrolled
          </Button>
        )}

        {/* --- JOIN SESSION BUTTON --- */}
        {isRegistered && workshop.enable_live_session && isTimeToJoin && (
          <Button size="small" variant="contained" onClick={handleJoinSession}>
            Join Session
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
