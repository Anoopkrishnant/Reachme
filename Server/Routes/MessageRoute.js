import express from 'express'
import { addMessage, getMessages } from '../Controller/MessageController.js'
import verifyToken from "../Middleware/Auth.js"

const router = express.Router()

router.use(verifyToken)
router.post("/" , addMessage)
router.get("/:chatId", getMessages)


export default router