const handleInitializePlayerCards = (
  io,
  distributedCardsArray,
  roomCode,
  rooms
) => {
  console.log("initializePlayerCards");
  const room = rooms.find((room) => room.roomCode === roomCode);
  if (room) {
    room.players.forEach((player, index) => {
      player.playerState.cards = distributedCardsArray[index];
    });
    io.to(roomCode).emit("updateRoomData", room);
  } else {
    console.error(`Room with code ${roomCode} not found.`);
  }
};
module.exports = {
  handleInitializePlayerCards,
};
