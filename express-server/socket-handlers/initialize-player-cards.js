const handleInitializePlayerCards = (
  io,
  distributedCardsArray,
  roomCode,
  rooms
) => {
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (!room) {
    console.error(`Room with code ${roomCode} not found`);
    return;
  }

  // Assign the distributed cards to players
  room.players.forEach((player, index) => {
    player.playerState.cards = distributedCardsArray[index];
  });

  // Notify all players about the distributed cards
  room.isDistributed = true;
  io.to(roomCode).emit("initializedPlayerCards");
  io.to(roomCode).emit("updateRoomData", room);

  // Start the timer for the first turn
  room.currentGlobalTurn = 0; // Starting with the first player
  io.to(roomCode).emit("startTimer", { currentTurn: room.currentGlobalTurn });
};

module.exports = {
  handleInitializePlayerCards,
};
