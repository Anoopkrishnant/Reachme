import API from "./api";

export const uploadImage = (data) => API.post('/upload', data)
export const uploadVideo = (data) => API.post("/upload/video", data);
export const uploadPost = (data) => API.post("/post", data)