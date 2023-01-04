import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const fetchComments = (postId) => API.get(`/comment/${postId}`);

export const postComment = (postId, comment) =>API.post(`/comment/${postId}`, { comment });

export const deleteComment = (commentId) => API.delete(`/comment/${commentId}`);