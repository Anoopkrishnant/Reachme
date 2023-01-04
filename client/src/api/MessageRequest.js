import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})



export const getMessages = (roomId) => API.get(`/message/${roomId}`);
export const addNewMessage = (message) => API.post(`/message`, message);