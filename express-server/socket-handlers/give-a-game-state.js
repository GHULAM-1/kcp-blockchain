const handleGiveAGameState = (socket, roomCode , rooms) => {
  const room = rooms.find((room) => room.roomCode === roomCode);
  socket.emit("gameState", room);
};
module.exports = {
    handleGiveAGameState
}