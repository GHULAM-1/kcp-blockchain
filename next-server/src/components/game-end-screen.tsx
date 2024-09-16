import { playerType } from "@/types/player-type";

function DrawScreen() {
  return (
    <>
      <div>Game's Draw</div>
    </>
  );
}
function NoResultScreen() {
  return (
    <>
      <div>NoResult !</div>
    </>
  );
}

export default function GameEndScreen({
  winnerEmail,
  players,
  gameResultType,
}: {
  gameResultType: "win" | "lose" | "draw" | "no result";
  winnerEmail: string;
  players: playerType[];
}) {
  return (
    <>
      {gameResultType === "draw" ? (
        <DrawScreen />
      ) : gameResultType === "no result" ? (
        <NoResultScreen />
      ) : (
        <>
          <div className="text-bold text-8xl text-blue-700">
            winner is : {winnerEmail}
          </div>
        </>
      )}
    </>
  );
}
