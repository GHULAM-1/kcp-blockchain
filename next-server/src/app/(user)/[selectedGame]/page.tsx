"use client";
import { gamesNamesType } from "@/types/games-names-type";
import CreateNewGame from "@/components/create-new-game";
import AllGamesOfAType from "@/components/ui/active-game-card/active-game-card";
import GameConfig from "@/components/game-config";
import { useGetPlayer } from "@/hooks/player/use-get-a-player";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

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

          <GameConfig gameName={params.selectedGame} />
        </div>
        <AllGamesOfAType gameName={params.selectedGame} />
      </div>
    </>
  );
}
