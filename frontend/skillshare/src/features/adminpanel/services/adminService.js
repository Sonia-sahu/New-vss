import API from "../../../services/api";

// ✅ Fetch moderation logs
export const getModerationLogs = () => API.get("/adminpanel/logs/");

// ✅ Fetch all users
export const getAllUsers = () => API.get("/adminpanel/users/");

// ✅ Delete a user
export const deleteUserById = (id) => API.delete(`/adminpanel/users/${id}/`);

// ✅ Edit a user
export const updateUserById = (id, data) =>
  API.put(`/adminpanel/users/${id}/`, data);

// Moderate a skill
export const moderateSkillService = async (id, data) => {
  return await API.patch(`/skills/${id}/moderate/`, data);
};

// Delete a skill
export const deleteSkillService = async (id) => {
  return await API.delete(`/skills/${id}/`);
};
