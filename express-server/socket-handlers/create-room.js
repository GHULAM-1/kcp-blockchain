const { generateCode } = require("../utils/generate-code");
const handleCreateRoom = (
  io,
  socket,
  roomCode,
  roomCreatorId,
  roomName,
  maxPlayers,
  roomCreatorEmail,
  gameType,
  creatorName,
  gameStatus,
  creatorImage,
  creatorObj,
  rooms
) => {
  console.log(
    roomCode,
    roomCreatorId,
    roomName,
    maxPlayers,
    roomCreatorEmail,
    gameType
  );

  if (!rooms.find((room) => room.roomCode === roomCode)) {
    const newRoom = {
      roomCode,
      players: [],
      watchers: [],
      maxPlayers,
      roomCreatorId,
      roomName,
      creationDate: new Date(),
      roomCreatorEmail,
      gameType,
      creatorName,
      gameState: {},
      gameStatus,
      gameCode: generateCode(),
      creatorImage,
      currentGlobalTurn: 0,
      isDistributed: false,
    };
    rooms.push(newRoom);
    newRoom.players.push(creatorObj);
    socket.join(roomCode);
    socket.emit("roomCreated", newRoom); // Emit only the new room object
    console.log(`Room ${roomCode} created by ${socket.id}`);
  }
  console.log("rooms array:", rooms);
};

module.exports = {
  handleCreateRoom,
};
