import API from "../../../services/api";

export const getNotifications = () => API.get("/notifications/");
export const patchNotificationRead = (id) =>
  API.patch(`/notifications/${id}/read/`);
