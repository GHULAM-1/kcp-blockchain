"use client";
import { gamesNamesType } from "@/types/games-names-type";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { Button } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { playerType } from "@/types/player-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis } from "lucide-react";
import { Eye } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "./ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "./ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
export default function ActiveGames({
  gameName,
}: {
  gameName: gamesNamesType;
}) {
  const { rooms, setRooms } = useGeneralStore();
  const [game, setGame] = useState();
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    socket.emit("giveAllGames");
    socket.on("allGames", (rooms) => {
      setRooms(rooms);
    });

    return () => {
      socket.off("allGames");
    };
  }, [setRooms]);

  const handleGameDeletion = (gameCode: string) => {
    socket.emit("deleteGame", gameCode);
  };

  const handleJoining = (gameCode: string) => {
    console.log("in the handle joining handler");

    if (
      user?.firstName &&
      user?.emailAddresses[0]?.emailAddress &&
      user?.imageUrl
    ) {
      const playerObj: playerType = {
        name: user.firstName,
        email: user.emailAddresses[0].emailAddress,
        mobileNumber: "03074593601",
        image: user.imageUrl,
        playerState: {
          turnNumber: 0,
          cards: [],
        },
      };
      socket.emit("joinGame", playerObj, gameCode);
    } else {
      console.error("User information is incomplete.");
    }
  };

  const handleGameEdit = () => {};

  return (
    <div className="flex mt-10 w-full flex-wrap gap-5 font-baskerville ">
      {rooms.map((room) => {
        return (
          <Link
            key={room.roomCode}
            href={`/overview/${gameName}/${room.roomCode}`}
            className="bg-secondary flex flex-col w-full rounded-md p-5 max-w-[350px]  "
          >
            <div className="flex justify-between ">
              <div className="flex gap-2">
                <span>12</span>
                <Eye />
              </div>
              <Badge className="bg-green-600 hover:bg-green-800">
                {room.gameStatus}
              </Badge>
            </div>

            <div className=" flex justify-start font-bold text-2xl ">
              {room.roomName}
            </div>

            <div className="w-full flex mt-9 gap-2 mb-1">
              <Dialog>
                <DialogTrigger>
                  <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                    join now
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>enter code</DialogTitle>
                  <InputOTP maxLength={6}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </DialogContent>
              </Dialog>
              <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                watch
              </Button>
            </div>

            <div className=" flex justify-between items-center border-t-[1px] border-secondary-foreground pt-4">
              <div className="flex gap-2 justify-center items-center ">
                <Avatar className="w-7 h-7">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className=" flex flex-col justify-center">
                  <div className="text-[10px]">ghulam</div>
                  <div className="text-[10px]">ilyasghulam35@gmail.com</div>
                </div>
              </div>

              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Ellipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>ghulam</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* <div>{room.gameType}</div>
            <div>{room.maxPlayers}</div>
            <div>{room.roomName}</div>
            <div>{room.roomCreatorEmail}</div>

            <div className="flex gap-3 mt-3">
              <Button onClick={handleGameEdit}>edit</Button>
              <Button onClick={() => handleGameDeletion(room.roomCode)}>
                delete
              </Button>
              <Button onClick={() => handleJoining(room.roomCode)}>join</Button>
            </div> */}
          </Link>
        );
      })}
    </div>
  );
}
