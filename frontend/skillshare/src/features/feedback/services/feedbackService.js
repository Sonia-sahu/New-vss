import API from "../../../services/api";

export const postFeedback = (data) => API.post("/feedback/submit/", data);
export const getReceivedFeedback = () => API.get("/feedback/received/");
