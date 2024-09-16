const Player = require("../../models/palyer-model");

const deletePlayer = async (req, res) => {
  try {
    const deletedPlayer = await Player.findOneAndDelete({
      email: req.params.email,
    });
    if (!deletedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = deletePlayer;
