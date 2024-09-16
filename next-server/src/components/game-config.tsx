"use client";
import { useEffect, useState } from "react";
import { gamesNamesType } from "@/types/games-names-type";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { socket } from "@/socket";
import { Input } from "./ui/input";
import { Check } from "lucide-react";
import { Clipboard } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { roomType } from "@/types/room-type";
import { useGeneralStore } from "@/stores/general-store";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUpdatePlayer } from "@/hooks/player/use-update-a-player";
import { useGetPlayer } from "@/hooks/player/use-get-a-player"; // Import the hook
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function GameConfig({
  gameName,
}: {
  gameName?: gamesNamesType;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const { setRooms } = useGeneralStore();
  const [maxPlayers, setMaxPlayers] = useState<number>(0);
  const [roomName, setRoomName] = useState<string>("");
  const [gameStatus, setGameStatus] = useState<string>("private");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const { toast } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const [purpose, setPurpose] = useState<"create" | "password-prompt">(
    "create"
  );

  const { player } = useGetPlayer(user?.emailAddresses[0].emailAddress || "");
  const { updatePlayer } = useUpdatePlayer(); // Destructure hook functions

  useEffect(() => {
    if (player && player.mobileNumber === "00000000000") {
      setPurpose("password-prompt");
    } else {
      setPurpose("create");
    }
  }, [player]);

  const handleCopyingOfGameCode = (gameCode: string) => {
    navigator.clipboard.writeText(gameCode);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleRoomCreation = () => {
    socket.emit(
      "createRoom",
      Math.random().toString(36).substr(2, 5),
      socket.id,
      roomName,
      maxPlayers,
      user?.emailAddresses[0].emailAddress,
      gameName,
      user?.firstName,
      gameStatus,
      user?.imageUrl,
      {
        name: user?.firstName,
        email: user?.emailAddresses[0].emailAddress,
        mobileNumber: phoneNumber || "03074593601",
        image: user?.imageUrl,
        playerState: {
          turnNumber: 0,
          cards: [],
        },
      }
    );
    socket.on("roomCreated", (newRoom: roomType) => {
      toast({
        title: "Game code",
        description: "Anyone with the code can join the game",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => handleCopyingOfGameCode(newRoom?.gameCode)}
          >
            {isCopied ? (
              <div className="flex flex-row-reverse justify-center items-center gap-2">
                <div>Copied</div>
                <Check className="w-[10px] h-[10px] fill-none dark:stroke-black stroke-white"></Check>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Clipboard className="w-4 h-4 fill-none"></Clipboard>
                <span>Copy code</span>
              </div>
            )}
          </ToastAction>
        ),
      });
      socket.emit("giveAllGames");
    });
  };

  const handlePhoneNumberUpdate = async () => {
    if (!user) return;

    const updatedPlayerData = {
      mobileNumber: phoneNumber,
    };

    try {
      await updatePlayer(
        user.emailAddresses[0].emailAddress,
        updatedPlayerData
      );
      toast({
        title: "Phone number updated",
        description: "Your phone number has been updated successfully.",
      });
      setPurpose("create");
    } catch (err) {
      console.error("Error updating phone number:", err);
    }
  };

  const handleClick = () => {
    if (purpose === "password-prompt") {
      handlePhoneNumberUpdate();
    } else {
      handleRoomCreation();
    }
  };

  return (
    <>
      <div>
        <Dialog>
          <DialogTrigger>
            <Button className="font-bold">
              {purpose === "password-prompt" ? "Enter Phone Number" : null}
              {purpose === "create" || purpose === "password-prompt"
                ? "Create New Game"
                : "Edit"}
            </Button>
          </DialogTrigger>
          {purpose === "password-prompt" ? (
            <DialogContent>
              <div className="text-2xl font-bold mb-4">Enter Phone Number</div>
              <Input
                type="text"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button onClick={handleClick} className="mt-4">
                Enter
              </Button>
            </DialogContent>
          ) : (
            <DialogContent>
              <div className="text-3xl font-bold ">
                {purpose === "create" ? "Creating New Game" : "Editing Game"}
              </div>

              <div>
                <div className="mb-2">Room Name</div>
                <Input onChange={(event) => setRoomName(event.target.value)} />
              </div>
              <div>
                <div>Max Players</div>
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
                <div>Game Status</div>
                <RadioGroup
                  defaultValue="private"
                  className="flex"
                  onValueChange={(value) => setGameStatus(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="r1" />
                    <Label htmlFor="r1">Private</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="public" id="r2" />
                    <Label htmlFor="r2">Public</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleClick}>
                {purpose === "create" ? "Create" : "Edit"}
              </Button>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
}
