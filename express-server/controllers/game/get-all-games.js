const Game = require("../../models/game-model");

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getAllGames;
