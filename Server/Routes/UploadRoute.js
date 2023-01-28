import express from "express";
const router = express.Router()
import multer from 'multer'
import verifyToken from "../Middleware/Auth.js"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/posts");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage })

const videoUpload = multer({ storage: videoStorage });

router.use(verifyToken)
router.post('/', upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File Uploaded Successfully")
  } catch (error) {
    console.log(error);
  }
})

router.post("/video", videoUpload.single("file"), (req, res) => {
  try {
    return res.status(201).json({ message: "video uploaded successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});


export default router