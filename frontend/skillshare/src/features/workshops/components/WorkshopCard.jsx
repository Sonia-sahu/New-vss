import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import StyledButton from "../../../common/StyledButton";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Modal,
  Chip,
} from "@mui/material";
import {
  fetchMyRegistrations,
  registerWorkshop,
} from "../actions/workshopActions";
import WorkshopStatusBadge from "./WorkshopStatusBadge";
import { selectMyRegistrations } from "../slice/workshopSlice";
import { useNavigate } from "react-router-dom";
import { fetchReceivedFeedback } from "../../feedback/actions/feedbackActions";

export default function WorkshopCard({ workshop }) {
  const dispatch = useDispatch();
  const [isTimeToJoin, setIsTimeToJoin] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const userRegistrations = useSelector(selectMyRegistrations);

  const isRegistered =
    Array.isArray(userRegistrations) && currentUser
      ? userRegistrations.some(
          (reg) =>
            Number(reg.workshop) === Number(workshop.id) &&
            Number(reg.user) === Number(currentUser.id)
        )
      : false;

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchMyRegistrations());
      dispatch(fetchReceivedFeedback());
    }
  }, [dispatch, currentUser]);

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
    window.open(workshop.meeting_url, "_blank");
  };

  const handleRegister = () => {
    dispatch(registerWorkshop({ workshop: workshop.id }))
      .unwrap()
      .then(() => {
        dispatch(fetchMyRegistrations());
        toast.success("Successfully registered!");
      })
      .catch((err) => {
        toast.error("Already registered or failed.");
        console.error("Registration error:", err);
      });
  };

  const feedbacks = useSelector((state) => state.feedback.feedbacks);
  const hasSubmittedFeedback =
    Array.isArray(feedbacks) &&
    feedbacks.some(
      (fb) =>
        Number(fb.workshop) === Number(workshop.id) &&
        Number(fb.reviewer) === Number(currentUser?.id)
    );

  const handleCardClick = () => {
    if (isRegistered) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: 345, // ✅ fixed width
          height: 300, // ✅ fixed height
          m: 2,
          cursor: isRegistered ? "pointer" : "default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
        onClick={handleCardClick}
      >
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5">{workshop.title}</Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {workshop.description}
          </Typography>

          <Box sx={{ mt: 1, mb: 1 }}>
            <Typography variant="body2">
              Date: {new Date(workshop.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              Time:{" "}
              {new Date(workshop.date).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              })}
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

        <CardActions sx={{ justifyContent: "flex-start", px: 2, pb: 2 }}>
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

          {isRegistered && workshop.status === "upcoming" && (
            <Button size="small" variant="outlined" disabled color="success">
              ✅ Enrolled
            </Button>
          )}

          {isRegistered && workshop.enable_live_session && isTimeToJoin && (
            <Button
              size="small"
              variant="contained"
              onClick={handleJoinSession}
            >
              Join Session
            </Button>
          )}

          {isRegistered && workshop.status === "completed" && (
            <StyledButton
              sx={{
                background: hasSubmittedFeedback
                  ? "gray"
                  : "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "#fff",
              }}
              onClick={() =>
                !hasSubmittedFeedback &&
                navigate(`/workshop/${workshop.id}/feedback`)
              }
              disabled={hasSubmittedFeedback}
            >
              {hasSubmittedFeedback ? "Feedback Submitted" : "Give Feedback"}
            </StyledButton>
          )}
        </CardActions>
      </Card>

      {/* --- MODAL --- */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            p: 4,
            bgcolor: "background.paper",
            maxWidth: 400,
            mx: "auto",
            mt: 10,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {workshop.title}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {workshop.description}
          </Typography>
          <Typography variant="body2">Host ID: {workshop.host_id}</Typography>
          <Typography variant="body2">
            Date: {new Date(workshop.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">
            Time:{" "}
            {new Date(workshop.date).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
              timeZone: "Asia/Kolkata",
            })}
          </Typography>

          <Typography variant="body2">
            Duration: {workshop.duration_minutes} minutes
          </Typography>
          <Typography variant="body2">
            Status: <Chip label={workshop.status} size="small" />
          </Typography>

          {workshop.enable_live_session && (
            <>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Meeting URL:
              </Typography>
              <Typography variant="body2" color="primary">
                <a
                  href={workshop.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {workshop.meeting_url}
                </a>
              </Typography>

              {isTimeToJoin ? (
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleJoinSession}
                >
                  Join Session
                </Button>
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Session will be available 15 minutes before start
                </Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}
