// controllers/player/check-and-create-player.js
const Player = require("../../models/palyer-model");
const checkAndCreatePlayer = async (req, res) => {
  const { email, name, image } = req.body;

  try {
    // Check if the player already exists
    let player = await Player.findOne({ email });

    if (player) {
      // If player exists, return the player data
      return res.status(200).json(player);
    }

    // If player does not exist, create a new player
    player = new Player({
      email,
      name,
      image,
      alias: "",
      isAdmin: false,
      isBlocked: false,
      mobileNumber: "00000000000",
      gamesPlayed: [],
    });

    const savedPlayer = await player.save();

    // Return the newly created player
    return res.status(201).json(savedPlayer);
  } catch (err) {
    // Handle errors
    return res.status(500).json({ error: err.message });
  }
};

module.exports = checkAndCreatePlayer;
