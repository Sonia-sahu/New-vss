import API from "../../../services/api";

export const getSkills = () => API.get("/skills/");
export const postSkill = (data) => API.post("/skills/", data);
export const putSkill = (id, data) => API.put(`/skills/${id}/`, data);
export const deleteSkillById = (id) => API.delete(`/skills/${id}/`);
export const getSkillAnalytics = (id) => API.get(`/skills/${id}/analytics/`);
