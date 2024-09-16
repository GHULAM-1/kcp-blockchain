import React, { useEffect } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { playerType } from "@/types/player-type";
import {
  giveNeighbourCardPlayerPosition,
  giveNeighbourPlayerPosition,
  giveNeighbourCardPosition,
  giveNeighbourMetaInfoPosition,
} from "@/utils/give-neighbour-player-position";
import { socket } from "@/socket";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NeighboursView({
  player,
  playerNumber,
  roomCode,
}: {
  player: playerType;
  playerNumber: number;
  roomCode: string;
}) {
  const {
    currentTurn,
    isDistributed,
    currentRoom,
    setTimeLeft,
    setCurrentTurn,
    timeLeft,
  } = useGeneralStore();

  useEffect(() => {
    // Listen for `timerUpdate` event from the server
    socket.on(
      "timerUpdate",
      ({
        timeLeft: newTimeLeft,
        currentTurn: newCurrentTurn,
      }: {
        timeLeft: number;
        currentTurn: number;
      }) => {
        setTimeLeft(newTimeLeft);
        setCurrentTurn(newCurrentTurn); // Update current turn if necessary
      }
    );

    // Cleanup function
    return () => {
      socket.off("timerUpdate"); // Clean up the event listener on unmount
    };
  }, [setCurrentTurn, setTimeLeft]);

  const getCorrectBackImage = (playerNumber: number) => {
    if (playerNumber === 0) {
      return "/cards/red-back.png";
    } else {
      return "/cards/red-back-horizontal.png";
    }
  };

  return (
    <div className={` ${giveNeighbourPlayerPosition(playerNumber)} `}>
      <div
        className={` ${giveNeighbourMetaInfoPosition(
          playerNumber
        )} w-[40%] h-24  flex justify-center flex-row-reverse  items-center text-3xl `}
      >
        <div>{player.name}</div>
        {currentTurn !== player?.playerState?.turnNumber && (
          <Avatar>
            <AvatarImage
              src={player.image !== null ? player.image : "loading"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
        {currentRoom.isDistributed &&
          player?.playerState?.turnNumber &&
          currentTurn === player?.playerState.turnNumber && (
            <div className="w-[50px] h-[50px] rounded-full bg-red-500 px-2">
              {timeLeft}
            </div>
          )}
      </div>

      <div className={`  ${giveNeighbourCardPlayerPosition(playerNumber)}`}>
        {Array.from({ length: 10 }).map((_, index) => (
          <img
            className={` ${giveNeighbourCardPosition(playerNumber)} `}
            key={index}
            src={getCorrectBackImage(playerNumber)}
            alt={`card-${index}`}
          />
        ))}{" "}
      </div>
    </div>
  );
}
