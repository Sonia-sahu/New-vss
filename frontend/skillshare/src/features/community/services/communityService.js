import API from "../../../services/api";

export const getExploreUsers = () => API.get("/community/explore/");
export const postFollowUser = (data) => API.post("/community/follow/", data);
export const deleteUnfollowUser = (id) =>
  API.delete(`/community/unfollow/${id}/`);
