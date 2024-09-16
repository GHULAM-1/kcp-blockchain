const { handleChangeTurn } = require("./timer");
const {
  isBhabhiValidMove,
} = require("../utils/bhabhi-rules/bhabhi-valid-move");
const { isBhabhiGameEnd } = require("../utils/bhabhi-rules/is-bhabhi-game-end");
const { isRungGameEnd } = require("../utils/rung-rules/is-rung-game-end");
const { isRungValidMove } = require("../utils/rung-rules/rung-valid-move");
const { postResults } = require("./post-results");
const handleCardClicked = (io, rooms, roomCode, gameType) => {
  console.log(`in the card cliked function in server for room : ${roomCode}`);

  switch (gameType) {
    case "rung":
      console.log("in the rung rule checker");
      if (isRungValidMove()) {
        if (isRungGameEnd()) {
          postResults();
          break;
        }
        handleChangeTurn(io, rooms, roomCode);
      }
      break;
    case "bhabhi":
      console.log("in the bhabhi rule checker");
      if (isBhabhiValidMove) {
        if (isBhabhiGameEnd) {
          postResults();
          break;
        }
        handleChangeTurn(io, rooms, roomCode);
      }
      break;

    default:
      console.log("no rule checker matched");
      break;
  }
  handleChangeTurn(io, rooms, roomCode);
};
module.exports = {
  handleCardClicked,
};
