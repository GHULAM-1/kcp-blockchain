import React, { useEffect } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { useUser } from "@clerk/nextjs";
import isGameCreatorSocket from "@/utils/is-game-creator-socket";
import { Button } from "./ui/button";
import { socket } from "@/socket";
import { deckOfCards } from "@/data/cards";
import { distributeCards } from "@/utils/shuffle-and-distribute";

export default function DistributeCardsBtn() {
  const { currentRoom, toggleIsDistributed, isDistributed } = useGeneralStore();
  const { user } = useUser();

  const handleCardDistribution = () => {
    if (currentRoom?.players.length) {
      const distributedArray = distributeCards(
        deckOfCards,
        currentRoom.players.length
      );
      socket.emit(
        "initializePlayerCards",
        distributedArray,
        currentRoom.roomCode
      );
      toggleIsDistributed();
    } else {
      console.error("Players data is not available for distribution");
    }
  };

  // Set up the event listener to catch `initializedPlayerCards`
  useEffect(() => {
    socket.on("initializedPlayerCards", () => {
      console.log("Cards have been successfully distributed.");
      socket.emit("timer", currentRoom.roomCode);
    });

    return () => {
      socket.off("initializedPlayerCards"); // Clean up the event listener on unmount
    };
  }, [isDistributed]);

  if (
    isGameCreatorSocket(
      currentRoom.roomCreatorEmail,
      user?.emailAddresses[0].emailAddress || ""
    )
  ) {
    return (
      <Button className="" onClick={handleCardDistribution}>
        Distribute cards
      </Button>
    );
  }

  return null; // Return null or a disabled button if not the game creator
}
