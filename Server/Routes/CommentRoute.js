import express from "express"
import verifyToken from "../Middleware/Auth.js"
import { deleteComment, getComments, postComment } from "../Controller/CommentController.js"
const router = express.Router();

router.use(verifyToken)

router.post("/:id", postComment)
router.get("/:id", getComments);
router.delete("/:id", deleteComment);

export default router;