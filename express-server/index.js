const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { handleSocketConnection } = require("./socket-handlers/main");

const app = express();
const server = http.createServer(app);
const port = 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => handleSocketConnection(io, socket));

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
