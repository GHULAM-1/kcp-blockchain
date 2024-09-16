"use client";
import { gamesNamesType } from "@/types/games-names-type";
import { socket } from "@/socket";
import { useEffect, useRef, useState } from "react";
import { useGeneralStore } from "@/stores/general-store";
import { Button } from "../button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { playerType } from "@/types/player-type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye } from "lucide-react";
import { Badge } from "../badge";
import { nanoid } from "nanoid";
import { Input } from "../input";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "../dialog";
import { useToast } from "../use-toast";
import isEmailInAnyRoom from "@/utils/is-email-in-any-room";
import { roomType } from "@/types/room-type";
import isGameCreatorSocket from "@/utils/is-game-creator-socket";
import CreatorActionDD from "@/components/creator-action-dd";
export default function AllGamesOfAType({
  gameName,
}: {
  gameName: gamesNamesType;
}) {
  const { toast } = useToast();
  const { rooms, setRooms } = useGeneralStore();
  const { user } = useUser();
  const router = useRouter();
  const otpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.emit("giveAllGames");
    socket.on("allGames", (rooms) => {
      setRooms(rooms);
    });

    return () => {
      socket.off("allGames");
    };
  }, [setRooms]);
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

  const handleOTPFromUser = (actualGameCode: string, roomCode: string) => {
    if (otpRef.current) {
      console.log("in the handle function of otp ", otpRef.current.value);
      if (actualGameCode === otpRef.current.value) {
        handleJoining(roomCode);
        router.push(`/${gameName}/${roomCode}`);
      }
    }
  };

  return (
    <div className="flex mt-10 w-full flex-wrap gap-5 font-baskerville ">
      {rooms.map((room: roomType) => {
        return (
          <div
            key={nanoid()}
            className="bg-secondary flex flex-col w-full rounded-md p-5 max-w-[350px]"
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

            <div className=" flex justify-between items-end font-bold text-2xl ">
              <div>{room.roomName}</div>

              <div className="text-sm">
                {room.players.length}/{room.maxPlayers} players
              </div>
            </div>

            <div className="w-full flex mt-9 gap-2 mb-1">
              {room.roomCreatorEmail !==
              user?.emailAddresses[0].emailAddress ? (
                <Dialog>
                  <DialogTrigger
                    disabled={room.players.length === room.maxPlayers}
                  >
                    {!isEmailInAnyRoom(
                      rooms,
                      user?.emailAddresses[0].emailAddress
                    ) && (
                      <Button
                        disabled={room.players.length === room.maxPlayers}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white"
                      >
                        {room.players.length === room.maxPlayers
                          ? "full house"
                          : "join"}
                      </Button>
                    )}
                  </DialogTrigger>
                  <DialogContent className="flex justify-center flex-col items-center ">
                    <DialogTitle className="text-3xl">enter code</DialogTitle>
                    <Input ref={otpRef} />

                    <Button
                      className="w-full"
                      onClick={() =>
                        handleOTPFromUser(room.gameCode, room.roomCode)
                      }
                    >
                      Done
                    </Button>
                  </DialogContent>
                </Dialog>
              ) : (
                <Link
                  className="w-full"
                  href={`/${gameName}/${room.roomCode}`}
                >
                  <Button className="w-full">see loby</Button>
                </Link>
              )}
              {user?.emailAddresses[0].emailAddress !==
              room.roomCreatorEmail ? (
                <Button className="w-full bg-slate-600 hover:bg-slate-700 text-white">
                  watch
                </Button>
              ) : null}
            </div>

            <div className=" flex justify-between items-center border-t-[1px] border-secondary-foreground pt-4">
              <div className="flex gap-2 justify-center items-center ">
                <Avatar className="w-7 h-7">
                  <AvatarImage src={room.creatorImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className=" flex flex-col justify-center">
                  <div className="text-[10px]">{room.creatorName}</div>
                  <div className="text-[10px]">{room.roomCreatorEmail}</div>
                </div>
              </div>
              {isGameCreatorSocket(
                room.roomCreatorEmail,
                user?.emailAddresses[0].emailAddress
              ) && (
                <CreatorActionDD
                  gameCode={room.gameCode}
                  roomCode={room.roomCode}
                  roomName={room.roomName}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
