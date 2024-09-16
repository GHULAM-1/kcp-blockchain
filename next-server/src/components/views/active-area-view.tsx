"use client";
import React from "react";
import DistributeCardsBtn from "../ditribute-cards-btn";
import isGameCreatorSocket from "@/utils/is-game-creator-socket";
isGameCreatorSocket;
import { useGeneralStore } from "@/stores/general-store";
export default function ActiveAreaView({
  playerNumber,
}: {
  playerNumber: string;
}) {
  const { currentRoom } = useGeneralStore();

  return (
    <>
      <div className="flex  justify-center   absolute top-[20%]    bg w-[82%] h-[50%]     items-center">
        {!currentRoom.isDistributed && <DistributeCardsBtn />}
      </div>
    </>
  );
}
