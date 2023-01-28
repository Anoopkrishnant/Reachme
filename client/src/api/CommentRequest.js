import API from "./api";


export const fetchComments = (postId) => API.get(`/comment/${postId}`);

export const postComment = (postId, comment) =>API.post(`/comment/${postId}`, { comment });

export const deleteComment = (commentId) => API.delete(`/comment/${commentId}`);