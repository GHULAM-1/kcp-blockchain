const Game = require("../../models/game-model");

const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getGame;
