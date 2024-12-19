"use client";
import { gamesNames } from "@/data/games-names";
import { gamesNamesType } from "@/types/games-names-type";
import Link from "next/link";
import GamesListingCards from "@/components/games-listing-cards";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useCheckAndCreatePlayer } from "@/hooks/player/use-check-and-create-player";
import { useGeneralStore } from "@/stores/general-store";
import axios from "axios";
import Leaderboard from "@/components/leaderboard";

export default function Overview() {
  const { user } = useUser();
  const [isPlayerCreated, setIsPlayerCreated] = useState(false);
  const { checkAndCreatePlayer } = useCheckAndCreatePlayer();
  const { setCurrentPlayer, currentPlayer } = useGeneralStore();

  const fetchPlayerData = async (email: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/players/${email}`
      );
      if (response.data && response.status === 200) {
        console.log("Player data fetched:", response.data);
        setCurrentPlayer(response.data);
        console.log("Updated current player:", currentPlayer);
      }
    } catch (error) {
      console.error("Error fetching player data:", error);
    }
  };
  console.log("primary user wallet info : " , user?.primaryWeb3Wallet)

  useEffect(() => {
    if (user && !isPlayerCreated) {
      const initializePlayer = async () => {
        await checkAndCreatePlayer(
          user.emailAddresses[0].emailAddress,
          user.fullName,
          user.imageUrl || ""
        );
        setIsPlayerCreated(true);
        fetchPlayerData(user.emailAddresses[0].emailAddress || "");
      };

      initializePlayer();
    }
  }, [user, isPlayerCreated]);

  const handleGameClick = async (gameName: gamesNamesType) => {
    if (user && user.fullName && !isPlayerCreated) {
      try {
        await checkAndCreatePlayer(
          user.emailAddresses[0].emailAddress,
          user.fullName,
          user.imageUrl || ""
        );
        setIsPlayerCreated(true);
        fetchPlayerData(user.emailAddresses[0].emailAddress || "");
      } catch (err) {
        console.error("Error in creating player:", err);
      }
    }
  };



  
  return (
    <>
      <div className="flex flex-col w-full px-4">
        
        
        <div className="flex flex-col gap-6 mt-10">
          <div className="font-baskerville font-black text-5xl">Games</div>
          <div className=" flex gap-6">
            {gamesNames.map((gameName: gamesNamesType) => (
              <Link
                href={`/${gameName}`}
                key={gameName}
                onClick={() => handleGameClick(gameName)}
              >
                <GamesListingCards activeGames={10} gameName={gameName} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex gap-4 w-full flex-col mt-16">
          <div className="font-baskerville font-black text-5xl">
            Leaderboard
          </div>
          <Leaderboard />
        </div>
      </div>
    </>
  );
}
