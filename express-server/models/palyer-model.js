const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  alias: {
    type: String,
    default: "",
  },
  mobileNumber: {
    type: String,
    default: "0000000000",
  },
  image: {
    type: String,
    default: "",
  },
  gamesPlayed: [],
});
const Player = mongoose.model("Player", playersSchema);
module.exports = Player;
