import API from "./api";

export const userChats = () => API.get("/chat");
export const createRoom = (memberId) => API.post(`/chat/${memberId}`);