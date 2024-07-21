const { handleCreateRoom } = require("./create-room");
const { handleGiveAllGames } = require("./give-all-games");
const { handleDeleteGame } = require("./delete-game");
const { handleJoinGame } = require("./join-game");
const { handleGiveAGameState } = require("./give-a-game-state");
const { handleInitializePlayerCards } = require("./initialize-player-cards");
let rooms = [];

const handleSocketConnection = (io, socket) => {
  socket.on(
    "createRoom",
    (
      roomCode,
      roomCreatorId,
      roomName,
      maxPlayers,
      roomCreatorEmail,
      gameType,
      creatorName,
      // gameState,
      gameStatus
    ) =>
      handleCreateRoom(
        io,
        socket,
        roomCode,
        roomCreatorId,
        roomName,
        maxPlayers,
        roomCreatorEmail,
        gameType,
        creatorName,
        // gameState,
        gameStatus,
        rooms
      )
  );

  socket.on("giveAllGames", () => handleGiveAllGames(io, rooms));
  socket.on("deleteGame", (roomCode) => handleDeleteGame(io, roomCode, rooms));
  socket.on("joinGame", (userObj, roomCode) =>
    handleJoinGame(io, socket, userObj, roomCode, rooms)
  );
  socket.on("giveAGameState", (roomCode) =>
    handleGiveAGameState(socket, roomCode, rooms)
  );
  socket.on("initializePlayerCards", (distributedCardsArray, roomCode) =>
    handleInitializePlayerCards(io, distributedCardsArray, roomCode, rooms)
  );
};

module.exports = {
  handleSocketConnection,
};
