"use client";
import { gamesNamesType } from "@/types/games-names-type";
import CreateNewGame from "@/components/create-new-game";
import ActiveGames from "@/components/active-games";
export default function SelectedGame({
  params,
}: {
  params: { selectedGame: gamesNamesType };
}) {
  return (
    <>
      <div className="mt-10 flex flex-col w-full font-baskerville">
        <div className="flex w-full justify-between">
          <div className="font-baskerville font-black text-4xl ">
            {params.selectedGame}
          </div>

          <CreateNewGame gameName={params.selectedGame} />
        </div>
        <ActiveGames gameName={params.selectedGame} />
      </div>
    </>
  );
}
