import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { CopyText } from "@/utils/copy-text";
import { Ellipsis, Binary, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import DeleteGame from "./delete-game";
import { Clipboard } from "lucide-react";
import GameConfig from "./game-config";
export default function CreatorActionDD({
  roomName,
  roomCode,
  gameCode,
}: {
  roomName: string;
  roomCode: string;
  gameCode: string;
}) {
  const { toast } = useToast();
  const handleCopyingOfGameCode = (code: string) => {
    CopyText(code);
    toast({
      title: "code copyied to clipboard!!",
    });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Dialog>
          <DialogTrigger className="w-full">
            <div className="flex gap-1 items-center hover:bg-secondary rounded-md text-white py-1 pl-2 hover:opacity-80 cursor-pointer w-full">
              <Binary className="w-4" />
              code
            </div>
          </DialogTrigger>
          <DialogContent
            className="flex gap-8 items-baseline cursor-pointer "
            onClick={() => handleCopyingOfGameCode(gameCode)}
          >
            <div className="font-black text-4xl">{gameCode}</div>
            <Clipboard />
          </DialogContent>
        </Dialog>
        <div className="flex gap-1 items-center">
          <GameConfig />
          {/* <GameConfig AGameOfAType={roomName} purpose="edit" /> */}
        </div>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DeleteGame gameName={roomName} roomCode={roomCode} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
