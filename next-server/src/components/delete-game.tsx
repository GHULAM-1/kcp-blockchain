import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { socket } from "@/socket";
import { Trash2 } from "lucide-react";
import { toast, useToast } from "./ui/use-toast";
import { useGeneralStore } from "@/stores/general-store";
export default function DeleteGame({
  gameName,
  roomCode,
}: {
  gameName: string;
  roomCode: string;
}) {
  const { setRooms } = useGeneralStore();
  const handleGameDeletion = (deleteCode: string) => {
    socket.emit("deleteGame", deleteCode);
  };
  socket.on("deleted", (newRooms) => {
    console.log(newRooms);
    setRooms(newRooms);

    toast({
      variant: "destructive",
      title: "Game deleted",
    });
  });
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div className="flex gap-1 items-center bg-red-900 rounded-md text-white p-1 hover:opacity-80 cursor-pointer w-full">
          <Trash2 className="w-4" />
          delete
        </div>
        <DialogContent>
          <div className=" w-full">
            Are you sure you want to delete{" "}
            <span className="text-red-600">"{gameName}"</span>
            <div className="flex w-full gap-3 mt-5">
              <Button
                className="w-full"
                onClick={() => handleGameDeletion(roomCode)}
              >
                yes
              </Button>
              <Button className="w-full">no</Button>
            </div>
          </div>
        </DialogContent>
      </DialogTrigger>
    </Dialog>
  );
}
