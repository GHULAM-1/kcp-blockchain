const Game = require("../../models/game-model");

const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.status(200).json(updatedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = updateGame;
