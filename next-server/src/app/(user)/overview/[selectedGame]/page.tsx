"use client";
import { gamesNamesType } from "@/types/games-names-type";
import CreateNewGame from "@/components/create-new-game";
export default function SelectedGame({
  params,
}: {
  params: { selectedGame: gamesNamesType };
}) {
  return (
    <>
      <div>
        <div className="text-5xl text-blue-600">{params.selectedGame}</div>
        <CreateNewGame gameName={params.selectedGame} />
      </div>
    </>
  );
}
