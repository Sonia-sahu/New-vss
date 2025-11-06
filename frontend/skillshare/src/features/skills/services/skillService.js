import API from "../../../services/api";

// Fetch all skills
export const getSkills = async () => {
  try {
    const res = await API.get("/skills/");
    return res.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw new Error("Failed to fetch skills. Please try again later.");
  }
};

// Create a new skill (with default status 'in review')
export const postSkill = async (data) => {
  try {
    // Add default status 'in review' when creating a skill
    const skillData = { ...data, status: "in review" };
    const res = await API.post("/skills/", skillData);
    return res.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw new Error("Failed to create skill. Please try again later.");
  }
};

// Update an existing skill
export const putSkill = async (id, data) => {
  try {
    const res = await API.put(`/skills/${id}/`, data);
    return res.data;
  } catch (error) {
    console.error(`Error updating skill with ID ${id}:`, error);
    throw new Error("Failed to update skill. Please try again later.");
  }
};

// Delete a skill by ID
export const deleteSkillById = async (id) => {
  try {
    await API.delete(`/skills/${id}/`);
    return id;
  } catch (error) {
    console.error(`Error deleting skill with ID ${id}:`, error);
    throw new Error("Failed to delete skill. Please try again later.");
  }
};

// Fetch analytics for a specific skill
export const getSkillAnalytics = async (id) => {
  try {
    const res = await API.get(`/skills/${id}/analytics/`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching analytics for skill with ID ${id}:`, error);
    throw new Error("Failed to fetch skill analytics. Please try again later.");
  }
};

// Update the status of a skill (admin-only functionality)
export const updateSkillStatus = async (skillId, status) => {
  try {
    const res = await API.patch(`/skills/status-update/${skillId}/`, {
      status,
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating status for skill with ID ${skillId}:`, error);
    throw new Error("Failed to update skill status. Please try again later.");
  }
};
