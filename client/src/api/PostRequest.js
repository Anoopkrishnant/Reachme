import API from "./api";


export const createPost = (data) => API.post("/post", data);
export const likePost = (id, userId) => API.put(`/post/${id}/like`, { userId: userId })
export const deletePost = (id) => API.delete(`/post/${id}`);
export const reportPost = (id,type)=>API.post(`/post/${id}/report`,{type})
export const editPost=(id,description)=>API.put(`/post/${id}`,{description})

// export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`)