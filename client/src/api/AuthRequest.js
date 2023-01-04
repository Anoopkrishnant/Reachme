import axios from "axios"
const token = localStorage.getItem("token")

const API = axios.create({baseURL: "http://localhost:5000", headers: {
    Authorization: `Bearer ${token}`
}})

export const logIn = (formData) => API.post('/auth/login', formData)
export const signUp = (formData) => API.post('/auth/register', formData)

