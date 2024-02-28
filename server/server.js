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

  socket.on("request_to_play", (data) => {
    const currentUser = allUsers[socket.id];
    currentUser.playerName = data.playerName;
    let opponentPlayer;
    for (const key in allUsers) {
      const user = allUsers[key];
      if (user.online && !user.playing && user.socket.id !== key) {
        opponentPlayer = user;
        break;

      }
    }

    if (opponentPlayer) {
      opponentPlayer.socket.emit("opponent_found", {
        opponentName: currentUser.playerName,
      });
      currentUser.socket.emit("opponent_found", {
        opponentName: opponentPlayer.playerName,
      });
    }
    else
    {
     currentUser.socket. emit("no_opponent_found", "No opponent found, please try again later");
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    allUsers[socket.id] = {
      socket: { ...socket, online: false },
      online: true,
    };
  });
});

httpServer.listen(3000);
