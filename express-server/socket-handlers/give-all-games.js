const handleGiveAllGames = (io, rooms) => {
  io.emit("allGames", rooms);
};
module.exports = { handleGiveAllGames };
