"use client";
import { useEffect } from "react";
import { useState } from "react";
import { gamesNamesType } from "@/types/games-names-type";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { socket } from "@/socket";

export default function CreateNewGame({
  gameName,
}: {
  gameName: gamesNamesType;
}) {
  const [rooms, setRooms] = useState<string[]>([]);
  useEffect(() => {}, []);

  const handleRoomCreation = () => {
    console.log("in it");
    socket.emit("createRoom", Math.random().toString(36).substr(2, 5));
    socket.on("roomCreated", (createdRoomCode: string) => {
      console.log(`Room created with code: ${createdRoomCode}`);
    });
  };
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button>create new game</Button>
          </DialogTrigger>
          <DialogContent>
            <div className="text-5xl font-bold ">
              creating new {gameName} game
            </div>
            <Button onClick={handleRoomCreation}>create</Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
