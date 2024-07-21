const handleDeleteGame = (io, roomCode, rooms) => {
  rooms = rooms.filter((room) => room.roomCode !== roomCode);
  io.in(roomCode).socketsLeave(roomCode);
  io.emit("allGames", rooms);
  console.log(`Room ${roomCode} deleted`);
};
module.exports = {
  handleDeleteGame,
};
