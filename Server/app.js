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
import { createServer } from "http"
import { Server } from "socket.io"



const app = express();

// To serve images for public
app.use(express.static('public'))
app.use('/posts', express.static("posts"))

//Middleware
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(cookieParser())
app.use(cors(corsOptions))
dotenv.config();

mongoose.connect(process.env.MONGOOSE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("DB Connected Successfully");
    });

//Routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute,);
app.use("/post", PostRoute);
app.use("/upload", UploadRoute);
app.use("/comment", CommentRoute);
app.use("/chat", ChatRoute);
app.use("/message", MessageRoute);

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "https://hello-reachme.netlify.app/"],
    },
});

let activeUsers = [];

io.on("connection", (socket) => {
    //add new user
    socket.on('add-new-user', (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id,
            });
        }
        console.log("Connected users", activeUsers);
        io.emit("get-users", activeUsers);
    });

    //send message
    socket.on("sendMessage", (data) => {
        const { receiverId } = data;
        const receiver = activeUsers.find((user) => user.userId === receiverId);
        console.log("sending from socket io: ", receiverId);
        console.log("Data", data);
        if (receiver) {
            io.to(receiver.socketId).emit("receiveMessage", data);
        }
    });

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        io.emit("get-users", activeUsers);
    });
});

httpServer.listen(process.env.PORT, () => {
    console.log("Backend Sever is Running !");
})
