import { store } from "../../../app/store";
import { addNotification } from "../slice/notificationSlice";

let socket = null;

export const connectNotificationsSocket = () => {
  const state = store.getState();
  const user = state.auth?.user;
  const token = state.auth?.accessToken;

  if (!user || !token) {
    console.warn(
      "User not authenticated, cannot connect to notifications socket"
    );
    return;
  }

  // If socket already connected, avoid reconnecting
  if (socket && socket.readyState === WebSocket.OPEN) {
    console.log("Notifications socket already connected");
    return;
  }

  const wsUrl =
    window.location.protocol === "https:"
      ? `wss://${window.location.host}/ws/notifications/`
      : `ws://${window.location.host}/ws/notifications/`;

  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.log("  Connected to notification WebSocket");
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log(" New notification received:", data);
      store.dispatch(addNotification(data));
    } catch (err) {
      console.error("Failed to parse notification:", err);
    }
  };

  socket.onclose = (event) => {
    console.warn("❌ Notification WebSocket closed:", event.reason);
  };

  socket.onerror = (error) => {
    console.error("⚠️ Notification WebSocket error:", error);
  };
};

export const disconnectNotificationsSocket = () => {
  if (socket) {
    console.log(" Disconnecting notification WebSocket...");
    socket.close();
    socket = null;
  }
};
