import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const getFollowers = (id) => API.get(`/user/followers/${id}`);
export const followUser = (currentUserId, id) => API.put(`/user/${id}/follow`, {currentUserId});
export const unFollowUser = (currentUserId, id) => API.put(`/user/${id}/unfollow`, {currentUserId});