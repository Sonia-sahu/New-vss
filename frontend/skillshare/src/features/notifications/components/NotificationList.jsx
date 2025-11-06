import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../actions/notificationActions";

export default function NotificationsList() {
  const {
    items: notifications,
    loading,
    error,
  } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(" Fetching notifications...");
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  console.log(" Current notifications:", notifications);

  if (loading) return <div>Loading notifications...</div>;
  if (error) return <div>Error loading notifications: {String(error)}</div>;

  return (
    <div>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <div>No notifications available</div>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.id} style={{ opacity: n.is_read ? 0.6 : 1 }}>
              <div>
                <small>{new Date(n.created_at).toLocaleString()}</small>
              </div>
              <div>{n.content}</div>
              {!n.is_read && (
                <button onClick={() => handleMarkRead(n.id)}>Mark read</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
