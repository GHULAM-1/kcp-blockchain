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
  // gameState,
  gameStatus,
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
      watchers:[],
      maxPlayers,
      roomCreatorId,
      roomName,
      creationDate: new Date(),
      roomCreatorEmail,
      gameType,
      creatorName,
      gameState: {},
      gameStatus,
    };
    rooms.push(newRoom);
    socket.join(roomCode);
    socket.emit("roomCreated", roomCode, rooms);
    console.log(`Room ${roomCode} created by ${socket.id}`);
  }
  console.log("rooms array:", rooms);
};

module.exports = {
  handleCreateRoom,
};
