const express = require("express");
const http = require("http");
const cors = require("cors"); // Import the cors package
const { Server } = require("socket.io");
const { handleSocketConnection } = require("./socket-handlers/main");
const mongoose = require("mongoose");
const postGame = require("./controllers/game/post-a-game");
const getGame = require("./controllers/game/get-a-game");
const getAllGames = require("./controllers/game/get-all-games");
const updateGame = require("./controllers/game/update-a-game");
const deleteGame = require("./controllers/game/delete-a-game");
const postPlayer = require("./controllers/player/post-a-player");
const getPlayer = require("./controllers/player/get-a-player");
const getAllPlayers = require("./controllers/player/get-all-players");
const updatePlayer = require("./controllers/player/update-a-player");
const deletePlayer = require("./controllers/player/delete-a-player");
const checkAndCreatePlayer = require("./controllers/player/check-and-create-player");



const app = express();
const server = http.createServer(app);
const port = 3001;
const mongoURI =
  "mongodb+srv://ghulam:1234@cluster0.ouyn2kn.mongodb.net/kcp-db?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(cors()); // Enable CORS for all routes

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (you can restrict this to your client domain)
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.post("/games", postGame);
app.get("/games/:id", getGame);
app.get("/games", getAllGames);
app.put("/games/:id", updateGame);
app.delete("/games/:id", deleteGame);
app.post("/players", postPlayer);
app.get("/players/:email", getPlayer);
app.get("/players", getAllPlayers);
app.put("/players/:email", updatePlayer);
app.delete("/players/:email", deletePlayer);
app.post("/players/checkandcreate", checkAndCreatePlayer);

io.on("connection", (socket) => handleSocketConnection(io, socket));

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
