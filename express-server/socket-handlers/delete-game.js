const handleDeleteGame = (io, roomCode, rooms) => {
  newRooms = rooms.filter((room) => room.roomCode !== roomCode);
  io.in(roomCode).socketsLeave(roomCode);
  io.emit("isDeleted", newRooms , );
  return newRooms;
};
module.exports = {
  handleDeleteGame,
};
