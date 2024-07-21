"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { roomType } from "@/types/room-type";
import { deckOfCards } from "@/data/cards";
import { Button } from "@/components/ui/button";
import { distributeCards } from "@/utils/shuffle-and-distribute";

export default function Game({ params }: { params: { game: string } }) {
  const [roomData, setRoomData] = useState<roomType>();

  console.log(params.game);
  socket.on("updatedRoomData", (room) => {
    console.log(room, "updatedRoom");
  });

  useEffect(() => {
    socket.emit("giveAGameState", params.game);
    socket.on("gameState", (gameState) => {
      setRoomData(gameState);
    });

    return () => {
      socket.off("gameState");
    };
  }, [params.game]);

  const handleCardDistribution = () => {
    if (roomData?.players.length) {
      const distributedArray = distributeCards(
        deckOfCards,
        roomData.players.length
      );
      console.log(distributedArray);
      socket.emit("initializePlayerCards", distributedArray, roomData.roomCode);
    } else {
      console.error("Players data is not available for distribution");
    }
  };

  return (
    <>
      <div className="text-green">{params.game}</div>
      <Button className="" onClick={handleCardDistribution}>
        Distribute
      </Button>
      <div>
        {roomData?.players.map((player) => {
          return (
            <div key={player.email}>
              <div>{player.name}</div>
              <div className="border-[3px]">
                {player.playerState.cards.map((card) => {
                  return <div key={card.cardName}>{card.cardName}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
