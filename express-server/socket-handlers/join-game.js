const { isEmailInAnyRoom } = require("../utils/is-email-in-any-room");

const handleJoinGame = (io, socket, userObj, roomCode, rooms) => {
  console.log("in the server side join game function", roomCode, userObj);
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (isEmailInAnyRoom(rooms, userObj.email)) {
    socket.emit("playerAlreadyInAnotherGame");
    return;
  }

  if (room) {
    if (room.players.length < room.maxPlayers) {
      // Determine the turn number for the new player
      const turnNumber =
        room.players.length > 0
          ? room.players[room.players.length - 1].playerState.turnNumber + 1
          : 1;

      // Set the turn number in the user's playerState
      userObj.playerState.turnNumber = turnNumber;

      console.log("here I am pushing");
      room.players.push(userObj);
      socket.join(roomCode);
      io.to(roomCode).emit("playerJoined", userObj, roomCode);
      console.log(
        `User ${userObj.id} joined room ${roomCode} with turn number ${turnNumber}`
      );
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
