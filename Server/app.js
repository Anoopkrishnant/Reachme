import express from "express";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from 'cors'
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";
import UploadRoute from "./Routes/UploadRoute.js";
import CommentRoute from "./Routes/CommentRoute.js";
import ChatRoute from "./Routes/ChatRoute.js"
import MessageRoute from "./Routes/MessageRoute.js"
import { corsOptions } from "./config/cors.js";





const app = express();

// To serve images for public
app.use(express.static('public'))
app.use('/posts', express.static("posts"))

//Middleware
app.use(bodyParser.json({limit: '30mb', extended :true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended :true}));

app.use(cookieParser())
app.use(cors())
dotenv.config();

mongoose.connect(process.env.MONGOOSE_URL,
{useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("DB Connected Successfully");
});

//Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute,);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/comment", CommentRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute );


app.listen(process.env.PORT,()=>{
    console.log("Backend Sever is Running !");
})
