import express from 'express'
import { createChat, findChat, userChat } from '../Controller/ChatController.js'
import verifyToken from "../Middleware/Auth.js"

const router = express.Router()

router.use(verifyToken)
router.get("/" ,userChat)
router.post("/:memberId", createChat);
router.get("/find/:receiverId", findChat);

export default router