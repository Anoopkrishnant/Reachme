import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const createPost = (data) => API.post("/post", data);
export const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId: userId })
export const deletePost = (id) => API.delete(`/post/${id}`);
export const reportPost = (id,type)=>API.post(`/post/${id}/report`,{type})
export const editPost=(id,description)=>API.put(`/post/${id}`,{description})

// export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)