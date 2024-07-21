"use client";
import { gamesNames } from "@/data/games-names";
import { gamesNamesType } from "@/types/games-names-type";
import Link from "next/link";
import GamesListingCards from "@/components/games-listing-cards";
import Nav from "@/components/nav";
export default function Overview() {
  return (
    <>
      <div className="flex flex-col w-full px-4">
        <div className="flex flex-col gap-6 mt-10">
          <div className="font-baskerville font-black text-5xl">Games</div>
          <div className=" flex gap-6">
            {gamesNames.map((gameName: gamesNamesType) => {
              return (
                <Link href={`/overview/${gameName}`}>
                  <GamesListingCards activeGames={10} gameName={gameName} />
                </Link>
              );
            })}
          </div>
        </div>
        {/* top scorres */}

        <div className="flex flex-col gap-6 mt-20">
          <div className="font-baskerville font-black text-4xl">
            LeaderBoard
          </div>
          <div className=" flex gap-6">
            {gamesNames.map((gameName: gamesNamesType) => {
              return (
                <Link href={`/overview/${gameName}`}>
                  <GamesListingCards activeGames={10} gameName={gameName} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
