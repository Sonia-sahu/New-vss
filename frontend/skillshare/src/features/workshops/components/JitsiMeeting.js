// JitsiMeeting.js
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";

export default function JitsiMeeting() {
  const { workshopId } = useParams();
  const navigate = useNavigate();
  const [jitsi, setJitsi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jitsiContainer = useRef(null);

  // Get workshop details from Redux store
  const workshops = useSelector((state) => state.workshops.workshops) || [];
  const workshop = workshops.find((w) => w.id === workshopId);

  useEffect(() => {
    if (!workshop || !workshop.enable_live_session) {
      setError("This workshop does not have a live session enabled.");
      setLoading(false);
      return;
    }

    // Check if it's time to join
    const workshopDate = new Date(workshop.date);
    const now = new Date();
    const timeDiff = workshopDate - now;

    // Allow joining 15 minutes before and until the end time
    const workshopEndTime = new Date(
      workshopDate.getTime() + workshop.duration_minutes * 60000
    );
    const isBeforeEnd = now < workshopEndTime;
    const isAfterStart = timeDiff <= 15 * 60000; // 15 minutes before

    if (!isAfterStart || !isBeforeEnd) {
      setError("This session is not available at this time.");
      setLoading(false);
      return;
    }

    // Dynamically load Jitsi Meet API script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => initializeJitsi();
    document.body.appendChild(script);

    return () => {
      if (jitsi) {
        jitsi.dispose();
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [workshopId, workshop]);

  const initializeJitsi = () => {
    if (!window.JitsiMeetExternalAPI) {
      setError("Failed to load Jitsi Meet API");
      setLoading(false);
      return;
    }

    try {
      const domain = "meet.jit.si";
      const options = {
        roomName: workshop.meeting_room_name,
        parentNode: jitsiContainer.current,
        width: "100%",
        height: "700px",
        userInfo: {
          displayName: "User", // You can get this from auth state
        },
        configOverwrite: {
          prejoinPageEnabled: false,
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListener("videoConferenceJoined", () => {
        setLoading(false);
      });

      api.addEventListener("readyToClose", () => {
        navigate(`/workshop/${workshopId}`);
      });

      setJitsi(api);
    } catch (err) {
      console.error("Error initializing Jitsi:", err);
      setError("Failed to initialize meeting");
      setLoading(false);
    }
  };

  const handleLeaveMeeting = () => {
    if (jitsi) {
      jitsi.dispose();
      navigate(`/workshop/${workshopId}`);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">{workshop?.title} - Live Session</Typography>
        <Button variant="outlined" onClick={handleLeaveMeeting}>
          Leave Meeting
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <Typography>Loading meeting...</Typography>
        </Box>
      )}

      {error && (
        <Box sx={{ p: 4, textAlign: "center" }}>
          <Typography color="error">{error}</Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => navigate(`/workshop/${workshopId}`)}
          >
            Back to Workshop
          </Button>
        </Box>
      )}

      <div
        ref={jitsiContainer}
        style={{ display: loading || error ? "none" : "block" }}
      />
    </Paper>
  );
}
