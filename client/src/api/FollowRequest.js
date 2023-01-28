import API from "./api";


export const getFollowers = (id) => API.get(`/user/followers/${id}`);
export const followUser = (currentUserId, id) => API.put(`/user/${id}/follow`, { currentUserId });
export const unFollowUser = (currentUserId, id) => API.put(`/user/${id}/unfollow`, { currentUserId });