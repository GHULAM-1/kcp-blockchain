const handlePauseTimer = (io, rooms, roomCode, pauseAt) => {
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (!room) {
    console.error(`Room with code ${roomCode} not found`);
    return;
  }

  if (room.intervalId) {
    clearInterval(room.intervalId);
    room.intervalId = null;
    room.timeElapsed = pauseAt || room.timeElapsed; // Set the timeElapsed to the pauseAt value
    console.log(`Timer paused at ${room.timeElapsed}s in room ${roomCode}`);
  }
};

const handleResumeTimer = (io, rooms, roomCode) => {
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (!room) {
    console.error(`Room with code ${roomCode} not found`);
    return;
  }

  if (!room.intervalId && room.timeElapsed < 30) {
    room.intervalId = setInterval(() => {
      room.timeElapsed += 1;

      console.log(`Time elapsed: ${room.timeElapsed}s in room ${roomCode}`);
      io.to(roomCode).emit("timerUpdate", {
        timeLeft: room.timeElapsed,
        currentTurn: room.currentGlobalTurn,
      });

      if (room.timeElapsed >= 30) {
        clearInterval(room.intervalId);
        room.intervalId = null;
        handleChangeTurn(io, rooms, roomCode); // Automatically move to the next turn and reset timer
      }
    }, 1000);

    console.log(`Timer resumed at ${room.timeElapsed}s in room ${roomCode}`);
  }
};

const handleChangeTurn = (io, rooms, roomCode) => {
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (!room) {
    console.error(`Room with code ${roomCode} not found`);
    return;
  }

  const totalPlayers = room.players.length;
  if (totalPlayers === 0) {
    console.error(`No players in room ${roomCode}`);
    return;
  }

  // Update the turn by incrementing and wrapping around with modulo
  room.currentGlobalTurn = (room.currentGlobalTurn + 1) % totalPlayers;

  // Notify all players about the turn change immediately
  io.to(roomCode).emit("turnChanged", {
    currentTurn: room.currentGlobalTurn,
    roomCode: roomCode,
  });

  console.log(`Turn changed to ${room.currentGlobalTurn} in room ${roomCode}`);

  // Reset the timer for the new turn
  room.timeElapsed = 0;
  handleTimer(io, rooms, roomCode);
};

const handleTimer = (io, rooms, roomCode) => {
  console.log("Starting timer in room:", roomCode);
  const room = rooms.find((room) => room.roomCode === roomCode);

  if (!room) {
    console.error(`Room with code ${roomCode} not found`);
    return;
  }

  room.timeElapsed = room.timeElapsed || 0; // Initialize or continue from the last timeElapsed

  if (!room.intervalId) {
    room.intervalId = setInterval(() => {
      room.timeElapsed += 1;

      console.log(`Time elapsed: ${room.timeElapsed}s in room ${roomCode}`);
      io.to(roomCode).emit("timerUpdate", {
        timeLeft: room.timeElapsed,
        currentTurn: room.currentGlobalTurn,
      });

      if (room.timeElapsed >= 30) {
        clearInterval(room.intervalId);
        room.intervalId = null;
        handleChangeTurn(io, rooms, roomCode); // Automatically move to the next turn and reset timer
      }
    }, 1000);
  }
};

module.exports = {
  handleTimer,
  handlePauseTimer,
  handleResumeTimer,
  handleChangeTurn,
};
