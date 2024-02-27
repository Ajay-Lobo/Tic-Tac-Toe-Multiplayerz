const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const allUsers = {};
io.on("connection", (socket) => {
  console.log("a new user connected" + socket.id);
  allUsers[socket.id] = {
    socket: socket,
    online: true,
  };
});
socket.on("request_to_play", (data) => {
  console.log(data);
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].id === socket.id) {
      allUsers[i].username = data.playername;
    }
  }
});
socket.on("disconnect", () => {
  console.log("user disconnected");
  allUsers[socket.id] = {
    socket: { ...socket, online: false },
    online: true,
  };
});

httpServer.listen(3000);
