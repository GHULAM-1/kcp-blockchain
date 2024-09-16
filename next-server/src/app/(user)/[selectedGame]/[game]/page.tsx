"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { roomType } from "@/types/room-type";
import { deckOfCards } from "@/data/cards";
import { Button } from "@/components/ui/button";
import { distributeCards } from "@/utils/shuffle-and-distribute";
import { playerType } from "@/types/player-type";
import GameView from "@/components/views/game-view";
import { useUser } from "@clerk/nextjs";
import { useGeneralStore } from "@/stores/general-store";

export default function Game({ params }: { params: { game: string } }) {
  const { currentRoom, setCurrentRoom } = useGeneralStore();
  const { user } = useUser();

  console.log(params.game);
  socket.on("updatedRoomData", (room) => {
    console.log(room, "updatedRoom");
  });
  socket.on("playerJoined", () => {
    console.log("here");
    socket.emit("giveAGameState", params.game);
    socket.on("gameState", (gameState: roomType) => {
      console.log(gameState.players);
      setCurrentRoom(gameState);
    });
  });

  useEffect(() => {
    socket.emit("giveAGameState", params.game);
    socket.on("gameState", (gameState: roomType) => {
      console.log(gameState.players);
      setCurrentRoom(gameState);
    });

    return () => {
      socket.off("gameState");
    };
  }, [params.game]);

  return (
    <>
      <GameView
        gameInfo={currentRoom}
        currentUserEmail={user?.emailAddresses[0].emailAddress}
      />
      {/* <div className="text-green">{params.game}</div>
      <Button className="" onClick={handleCardDistribution}>
        Distribute
      </Button>
      <div>
        {roomData?.players.map((player: playerType) => {
          return (
            <div key={player.mobileNumber}>
              <div>{player.email}</div>

              <div className="border-[3px]">
                {player.playerState.cards.map((card) => {
                  return <div key={card.cardName}>{card.cardName}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div> */}
    </>
  );
}
