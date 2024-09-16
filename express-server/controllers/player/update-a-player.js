const Player = require("../../models/palyer-model");

const updatePlayer = async (req, res) => {
  try {
    const updatedPlayer = await Player.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(updatedPlayer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = updatePlayer;
