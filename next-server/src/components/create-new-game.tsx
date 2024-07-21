"use client";
import { useEffect, useState } from "react";
import { gamesNamesType } from "@/types/games-names-type";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { socket } from "@/socket";
import { Input } from "./ui/input";
import { useUser } from "@clerk/nextjs";
import { roomType } from "@/types/room-type";
import { useGeneralStore } from "@/stores/general-store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CreateNewGame({
  gameName,
}: {
  gameName: gamesNamesType;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { setRooms } = useGeneralStore();
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>();
  const [gameStatus, setGameStatus] = useState<string>("private");

  const handleRoomCreation = () => {
    console.log("in it");

    socket.emit(
      "createRoom",
      Math.random().toString(36).substr(2, 5),
      socket.id,
      roomName,
      maxPlayers,
      user?.emailAddresses[0].emailAddress,
      gameName,
      user?.firstName,
      gameStatus // Pass the gameStatus value
    );
    socket.on("roomCreated", (createdRoomCode: string, rooms) => {
      console.log("room created");
      socket.emit("giveAllGames");
    });
  };
  const handleDialogOpening = () => {
    setGameStatus("private");
    setMaxPlayers(0);
  };
  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button className="font-bold" onClick={handleDialogOpening}>
              create new game
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="text-5xl font-bold ">
              creating new {gameName} game
            </div>

            <div>
              <div className="mb-2">room Name</div>
              <Input onChange={(event) => setRoomName(event.target.value)} />
            </div>
            <div>
              <div>max players</div>
              <div className="flex justify-between items-center">
                <div>{maxPlayers}</div>
                <div className="flex gap-4">
                  <Button onClick={() => setMaxPlayers(maxPlayers + 1)}>
                    +
                  </Button>
                  <Button onClick={() => setMaxPlayers(maxPlayers - 1)}>
                    -
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-between my-2">
              <div>game status</div>
              <RadioGroup
                defaultValue="private"
                className="flex"
                onValueChange={(value) => setGameStatus(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="r1" />
                  <Label htmlFor="r1">private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="r2" />
                  <Label htmlFor="r2">public</Label>
                </div>
              </RadioGroup>
            </div>
            <Button onClick={handleRoomCreation}>create</Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
