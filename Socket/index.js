const socketIO = require("socket.io");

const io = socketIO(8800, {
  cors: {
    origin: "http://localhost:3000",
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