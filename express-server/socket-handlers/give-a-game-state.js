const handleGiveAGameState = (socket, roomCode) => {
  const room = rooms.find((room) => room.roomCode === roomCode);
  socket.emit("gameState", room);
};
module.exports = {
    handleGiveAGameState
}