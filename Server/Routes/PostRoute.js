import express from "express";
import {  createPost, deletePost, getPost, getTimelinePosts, getUserPosts, likePost, reportPost, updatePost } from "../Controller/PostController.js";
const router = express.Router()
import verifyToken from "../Middleware/Auth.js"

router.use(verifyToken)
router.post('/', createPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)
router.put('/:id/like', likePost )
router.get("/user/:id", getUserPosts);
router.get("/:id/timeline", getTimelinePosts);
router.post("/:id/report", reportPost);

export default router;