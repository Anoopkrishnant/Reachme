import axios from "axios"
const config = {
    withCredentials: true,
};

const API = axios.create({ baseURL: "http://localhost:5000", config })
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers = {
        Authorization: `Bearer ${token}`,
    }
    return config
}, (err) => {
    return Promise.reject(err);
})

export default API