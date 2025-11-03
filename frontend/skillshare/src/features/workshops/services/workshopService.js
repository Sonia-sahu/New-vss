import API from "../../../services/api";

export const getWorkshops = () => API.get("/workshops/");
export const postWorkshop = (data) => API.post("/workshops/", data);
export const putWorkshop = (id, data) => API.put(`/workshops/${id}/`, data);
export const deleteWorkshopById = (id) => API.delete(`/workshops/${id}/`);
export const registerForWorkshop = (data) =>
  API.post("/workshops/register/", data);
export const getMyRegistrations = () => API.get("/workshops/my-registrations/");
