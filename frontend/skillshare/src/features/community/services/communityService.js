import API from "../../../services/api";

//   Get all users except current user
export const getExploreUsers = () => API.get("/community/explore/");

//   Toggle follow/unfollow
export const toggleFollowUser = (userId) =>
  API.post(`/community/follow/${userId}/`);

//   Get current user's followers
export const getFollowers = () => API.get("/community/followers/");

//   Get current user's following
export const getFollowing = () => API.get("/community/following/");

//   Post a new tutorial
export const postTutorial = (tutorialData) =>
  API.post("/community/tutorials/post/", tutorialData);

//   Get all tutorials
export const getAllTutorials = () => API.get("/community/tutorials/");

//   Get tutorials by a specific user
export const getUserTutorials = (userId) =>
  API.get(`/community/tutorials/user/${userId}/`);
