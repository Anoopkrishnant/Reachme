import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({
    baseURL: "http://localhost:5000",
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export const getUserDetails = (id) => API.get(`/user/${id}`);
export const updateProfile = (id, formData) => API.put(`/user/${id}`, formData);
export const getAllUsers = () => API.get("/user");
export const getNotifications = () => API.get(`/user/notifications`);
export const clearNotifications = (id) => API.put(`/user/${id}/clearNotifications`);