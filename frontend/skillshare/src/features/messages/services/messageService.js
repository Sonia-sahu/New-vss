import API from "../../../services/api";

export const getMessages = () => API.get("/messages/");
