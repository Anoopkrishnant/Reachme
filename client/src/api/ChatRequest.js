import axios from "axios"

const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export const userChats = () => API.get("/chat");
export const createRoom = (memberId) => API.post(`/chat/${memberId}`);