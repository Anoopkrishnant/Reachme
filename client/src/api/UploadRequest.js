import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const uploadImage = (data) => API.post('/upload', data)
export const uploadVideo = (data) => API.post("/upload/video", data);
export const uploadPost = (data) => API.post("/post",data)