import React, { useEffect, useState } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { socket } from "@/socket";
import Timer from "../timer";
import { playerType } from "@/types/player-type";
import { findPlayerByEmail } from "@/utils/find-player-by-email";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cardType } from "@/types/card-type";
export default function HomeView({
  homeViewEmail,
  roomCode,
}: {
  homeViewEmail: string;
  roomCode: string;
}) {
  const {
    currentRoom,
    setCurrentRoom,
    setCurrentTurn,
    currentTurn,
    isDistributed,
    timeLeft,
    setTimeLeft,
  } = useGeneralStore();
  const { user } = useUser();
  const [player, setPlayer] = useState<playerType | undefined>(undefined);

  useEffect(() => {
    socket.on("updateRoomData", (updatedRoom) => {
      setCurrentRoom(updatedRoom);
    });

    return () => {
      socket.off("updateRoomData");
    };
  }, [setCurrentRoom]);

  useEffect(() => {
    const userEmail = user?.emailAddresses?.[0]?.emailAddress;
    if (userEmail && currentRoom) {
      const foundPlayer = findPlayerByEmail(userEmail, currentRoom.players);
      setPlayer(foundPlayer);
    }
  }, [user, currentRoom]);
  useEffect(() => {
    // Listen for `timerUpdate` event from the server
    socket.on(
      "timerUpdate",
      ({
        timeLeft,
        currentTurn,
      }: {
        timeLeft: number;
        currentTurn: number;
      }) => {
        setTimeLeft(timeLeft);
        setCurrentTurn(currentTurn); // Update current turn if necessary
      }
    );

    // Cleanup function
    return () => {
      socket.off("timerUpdate"); // Clean up the event listener on unmount
    };
  }, [setCurrentTurn]);
  const handleCardClick = (card: cardType) => {
    if (player?.playerState !== undefined) {
      if (currentTurn === player?.playerState.turnNumber) {
        socket.emit("cardClicked", roomCode);
      } else {
        console.log(`${player?.email} : not your turn `);
      }
    }
  };

  return (
    <div className="text-3xl  w-full flex justify-center items-center bottom-0 absolute font-bold  h-[22%]     ">
      {/* <div>{player?.playerState.turnNumber}</div>
      <div>{currentTurn}</div>
      {currentRoom.isDistributed &&
        currentTurn === player?.playerState.turnNumber && <div>{timeLeft}</div>}
      {homeViewEmail} */}
      {/* <div
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
          currentTurn === player?.playerState.turnNumber && (
            <div className="w-[50px] h-[50px] rounded-full bg-red-500 px-2">
              {timeLeft}
            </div>
          )}
      </div> */}
      <div className=" flex gap-4 text-sm  w-[40%] absolute  h-full  justify-center items-center bottom-0   ">
        {player?.playerState &&
          player?.playerState.cards &&
          player?.playerState.cards.map((card, index) => (
            <img
              style={{ left: `${index * 40}px` }}
              src={card.cardImage}
              onClick={() => handleCardClick(card)}
              className=" w-[18%] h-full hover:scale-105 transition-all ease-linear cursor-pointer absolute bottom-0   "
              key={card.cardName}
            />
          ))}
      </div>
    </div>
  );
}
