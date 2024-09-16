function isEmailInAnyRoom(rooms, email) {
  return rooms.some((room) =>
    room.players.some((player) => player.email === email)
  );
}

module.exports = {
  isEmailInAnyRoom,
};
