const handleJoinGame = (io, socket, userObj, roomCode , rooms) => {
  console.log("in the server side join game function", roomCode, userObj);
  const room = rooms.find((room) => room.roomCode === roomCode);
   
  if (room) {
    if (room.players.length < room.maxPlayers) {
      room.players.push(userObj);
      socket.join(roomCode);
      //  io.to(roomCode).emit("playerJoined", userObj, roomCode);
      //  console.log(`User ${userObj.id} joined room ${roomCode}`);
    } else {
      socket.emit("roomFull", roomCode);
      console.log(`Room ${roomCode} is full`);
    }
  } else {
    socket.emit("roomNotFound", roomCode);
    console.log(`Room ${roomCode} not found`);
  }
};
module.exports = {
  handleJoinGame,
};
