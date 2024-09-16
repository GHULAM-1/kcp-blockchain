const Player = require("../../models/palyer-model");

const getPlayer = async (req, res) => {
  try {
    const player = await Player.findOne({ email: req.params.email });
    if (!player) {
      return res
        .status(404)
        .json({ message: "Player not found", isFound: false });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = getPlayer;
