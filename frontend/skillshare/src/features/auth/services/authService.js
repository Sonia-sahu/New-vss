import API from "../../../services/api";

// --- Helper: Get Auth Header ---
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// --- Register a new user ---
const register = async (userData) => {
  const response = await API.post("/users/register/", userData);
  return response.data;
};

// --- Login user and save tokens ---
const login = async (credentials) => {
  const response = await API.post("/users/login/", {
    email: credentials.email,
    password: credentials.password,
  });

  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
  }
  return response.data;
};

// --- Logout user ---
const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refresh");
};

// --- Fetch user profile ---
const getProfile = async () => {
  const headers = getAuthHeader();
  const response = await API.get("/users/profile/", { headers });
  return response.data;
};

// --- Update user profile ---
const updateProfile = async (updatedData) => {
  const headers = getAuthHeader();
  const response = await API.put("/users/profile/", updatedData, { headers });
  return response.data;
};

// --- Refresh JWT token ---
const refreshToken = async () => {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token found");

  const response = await API.post("/auth/token/refresh/", { refresh });
  if (response.data.access) {
    localStorage.setItem("token", response.data.access);
  }

  return response.data;
};

// --- Change password ---
const changePassword = async (passwordData) => {
  const headers = getAuthHeader();
  const response = await API.post("/users/change-password/", passwordData, { headers });
  return response.data;
};



const updateSettings = async (settingsData, token) => {
  try {
    const response = await API.put("/users/settings/",
      settingsData,
     
    );
    return response.data;
  } catch (error) {
    console.error("Error updating settings:", error);
    throw error;
  }
};
// --- Fetch user settings ---
const getSettings = async () => {
  const headers = getAuthHeader();
  const response = await API.get("/users/settings/", { headers });
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getSettings,
  getProfile,
  updateSettings,
  updateProfile,
  refreshToken,
  changePassword,
};

export default authService;
