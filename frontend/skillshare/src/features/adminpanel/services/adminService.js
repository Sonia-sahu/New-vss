import API from "../../../services/api";

export const getModerationLogs = () => API.get("/adminpanel/logs/");
export const getAllUsers = () => API.get("/adminpanel/users/");
export const patchModerateSkill = (id, data) =>
  API.patch(`/adminpanel/skills/${id}/moderate/`, data);
