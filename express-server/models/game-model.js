const mongoose = require("mongoose");

const gamesSchema = new mongoose.Schema({
  isTournamentGame: {
    required: true,
    type: Boolean,
    default: false,
  },
  gamePosition: {
    required: true,
    type: String,
    enum: ["notStarted", "ongoing", "finished"],
    default: "notStarted",
  },
  startingDate: {
    type: Date,
    default: Date.now,
  },
  roomCode: {
    required: true,
    type: String,
  },
  players: [
    {
      name: {
        required: true,
        type: String,
      },
      alias: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
        default: "",
      },
      playerState: {
        turnNumber: {
          required: true,
          type: Number,
        },
        cards: [
          {
            cardName: {
              type: String,
              required: true,
            },
            cardNumber: {
              type: Number,
              required: true,
            },
            cardColor: {
              required: true,
              type: String,
              enum: ["red", "black"],
            },
            cardType: {
              required: true,
              type: String,
              enum: ["hearts", "diamonds", "clubs", "spades"],
            },
            cardStrength: {
              type: Number,
              required: true,
            },
            cardImage: {
              type: String,
              required: true,
            },
            isFaceCard: {
              type: Boolean,
              default: true,
              required: true,
            },
          },
        ],
      },
    },
  ],
  maxPlayers: {
    required: true,
    type: Number,
    enum: [2, 3, 4],
    default: 4,
  },
  roomCreatorId: {
    type: String,
    required: true,
  },
  roomName: {
    type: String,
    required: true,
  },
  roomCreatorEmail: {
    type: String,
    required: true,
  },
  gameType: {
    type: String,
    default: "rung",
    enum: ["rung", "bhabhi"],
  },
  creatorName: {
    type: String,
    required: true,
  },
  gameCode: {
    type: Number,
    required: true,
  },
  gameStatus: {
    type: String,
    default: "public",
    required: true,
    enum: ["public", "private"],
  },
  watchers: [
    {
      name: String,
      email: String,
      image: String,
    },
  ],
  creatorImage: {
    type: String,
    required: true,
    default: "",
  },
  currentGlobalTurn: {
    type: Number,
    required: true,
  },
  isDistributed: {
    type: Boolean,
    default: false, // Set a default value for isDistributed
  },
});

const Game = mongoose.model("Game", gamesSchema);
module.exports = Game;
