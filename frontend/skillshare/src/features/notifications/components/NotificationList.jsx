import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotifications } from "../actions/notificationActions";
import NotificationItem from "./NotificationItem";
import { Box } from "@mui/material";

export default function NotificationList() {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </Box>
  );
}
