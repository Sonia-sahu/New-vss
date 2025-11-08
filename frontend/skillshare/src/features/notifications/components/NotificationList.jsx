import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../actions/notificationActions";
import {
  IconButton,
  Box,
  Typography,
  List,
  ListItem,
  Button,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function NotificationsList() {
  const {
    items: notifications,
    loading,
    error,
  } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("📡 Fetching notifications...");
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  // console.log("🔔 Current notifications:", notifications);

  return (
    <Box
      sx={{
        // mx: "1",

        backgroundColor: "#2f2f3aff",
        borderRadius: 2,
        boxShadow: 3,
        p: 3,
      }}
    >
      <Typography variant="h5" gutterBottom>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        Notifications
      </Typography>

      {loading && (
        <Stack alignItems="center" sx={{ mt: 2 }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Loading notifications...
          </Typography>
        </Stack>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          Error loading notifications: {String(error)}
        </Alert>
      )}

      {!loading && !error && (
        <>
          {notifications.length === 0 ? (
            <Typography variant="body1">No notifications available</Typography>
          ) : (
            <List>
              {notifications.map((n) => (
                <ListItem
                  key={n.id}
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    opacity: n.is_read ? 0.6 : 1,
                    borderBottom: "1px solid #eee",
                    py: 2,
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {new Date(n.created_at).toLocaleString()}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {n.content}
                  </Typography>
                  {!n.is_read && (
                    <Button
                      variant="custom"
                      size="small"
                      sx={{ mt: 1 }}
                      onClick={() => handleMarkRead(n.id)}
                    >
                      Mark as read
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </Box>
  );
}
