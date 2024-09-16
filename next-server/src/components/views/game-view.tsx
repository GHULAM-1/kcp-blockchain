import React from "react";
import ActiveAreaView from "./active-area-view";
import HomeView from "./home-view";
import NeighboursView from "./neighbours-view";
import { roomType } from "@/types/room-type";
import { isCurrentUserAPlayer } from "@/utils/is-current-user-a-player";
import { removeCurrentUser } from "@/utils/remove-current-player";
import { useState, useEffect } from "react";
import { playerType } from "@/types/player-type";
import DistributeCardsBtn from "../ditribute-cards-btn";
export default function GameView({
  gameInfo,
  currentUserEmail,
}: {
  gameInfo: roomType | undefined;
  currentUserEmail: string | undefined;
}) {
  const [neighbourPlayers, setNeighboursPlayers] = useState<playerType[]>([]);

  useEffect(() => {
    if (gameInfo && currentUserEmail) {
      const newArray = removeCurrentUser(gameInfo.players, currentUserEmail);
      setNeighboursPlayers(newArray);
    }
  }, [gameInfo, currentUserEmail]);

  if (gameInfo && currentUserEmail) {
    return (
      <>
        <div className=" relative z-0 bg-[url('/table_bg.jpg')] bg-cover bg-center  h-[87vh] w-screen  ">
          {neighbourPlayers.map((player, index) => {
            return (
              <NeighboursView
                roomCode={gameInfo.roomCode}
                key={index}
                playerNumber={index}
                player={player}
              />
            );
          })}

          <div className="flex justify-center items-center">
            <ActiveAreaView />
          </div>
          {isCurrentUserAPlayer(gameInfo.players, currentUserEmail) && (
            <HomeView
              roomCode={gameInfo.roomCode}
              homeViewEmail={currentUserEmail}
            />
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>game crashed</div>
      </>
    );
  }
}
