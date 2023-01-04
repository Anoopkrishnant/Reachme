import express from "express";
import { clearNotifications, deleteUser, followUser, getAllUsers, getFollowers, getNotifications, getUser, searchUser, unfollowUser, updateUser } from "../Controller/UserController.js";
import verifyToken from "../Middleware/Auth.js"

const router = express.Router()

router.use(verifyToken);
router.get("/", getAllUsers);
router.get('/:id', getUser)
router.get("/followers/:id", getFollowers);
router.get("/search", searchUser);
router.get("/notifications", getNotifications);

router.put('/:id', updateUser);
router.put('/:id/follow', followUser);
router.put('/:id/unfollow', unfollowUser);
router.put("/:id/clearNotifications/", clearNotifications);

router.delete('/:id', deleteUser);

export default router