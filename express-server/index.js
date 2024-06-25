const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 4000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
let rooms = {};

io.on("connection", (socket) => {
  console.log(`connected with id ${socket.id}`);
  socket.on("createRoom", (roomCode) => {
    console.log("here");
    if (!rooms[roomCode]) {
      rooms[roomCode] = {
        players: [],
      };
      socket.join(roomCode);
      socket.emit("roomCreated", roomCode);
      console.log(`Room ${roomCode} created by ${socket.id}`);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
